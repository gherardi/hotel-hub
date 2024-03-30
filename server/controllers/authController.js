import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

import supabase from './../utils/supabase.js';
import AppError from './../utils/appError.js';
import Email from './../utils/sendEmail.js';

dotenv.config();

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);

	res.cookie('jwt', token, {
		httpOnly: false,
		// secure: req.secure || req.headers['x-forwarded-proto'] === 'http'
		expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
	});

	// Remove password from output
	// user.password = null;

	res.status(statusCode).json({
		status: 'success',
		token,
		isAdmin: user.is_admin,
		// data: {
		// 	user,
		// },
	});
};

export const signup = async (req, res, next) => {
	try {
		const { name, email, password, hotel_id } = req.body;

		const hash = await bcrypt.hash(password, 12);

		const { data, error } = await supabase
			.from('users')
			.insert([
				{
					name,
					email,
					password: hash,
					hotel_id,
				},
			])
			.select();

		if (error) {
			if (error.code === '23505')
				return next(new AppError('Email already taken, try another one', 409));
			return next(new AppError(error.message));
		}
		if (data.length === 0) return next(new AppError('Errore durante la registrazione', 400));

		// crea token e invialo al client
		createSendToken(data[0], 201, req, res);
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const hotels = async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('hotel').select('*');

		if (error) {
			return next(new AppError(error.message));
		}

		res.status(200).json({ data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const { data, error } = await supabase.from('users').select('*').eq('email', email);

		// Check if query has returned an error
		if (error) return next(new AppError(error.message));
		// Check if query has returned a user
		if (data.length === 0) return next(new AppError('Incorrect email or password', 401));

		// 2) Check if password is correct
		const correctPassword = await bcrypt.compare(password, data[0].password);
		if (!correctPassword) return next(new AppError('Incorrect password', 401));

		await supabase.from('users').update({ password_reset_token: null }).eq('email', email);

		// create and send token to client
		createSendToken(data[0], 200, req, res);
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const logout = (req, res, next) => {
	// res.cookie('jwt', 'loggedout', {
	//   expires: new Date(Date.now() + 10 * 1000),
	//   httpOnly: true,
	// });
	res.status(200).json({ status: 'success' });
};

// send email with token for resetting password
export const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;

		const token = crypto.randomUUID();

		const { data, error } = await supabase
			.from('users')
			.update({
				password_reset_token: token,
			})
			.eq('email', email)
			.select('email');

		if (error) return next(new AppError(error.message));
		if (data.length === 0) return next(new AppError('No account found with that email', 401));

		// const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
		const resetURL = `${req.protocol}://localhost:5173/reset-password/${token}`;

		await new Email(email, resetURL).sendPasswordReset();

		res.status(200).json({
			status: 'success',
			message: 'ResetURL sent to email!',
		});
	} catch (err) {
		return next(new AppError('There was an error sending the email. Try again later!'), 500);
	}
};

// change the password from the body, unique token are from url
export const resetPassword = async (req, res, next) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// check if token is passed and valid
		if (!token) return next(new AppError('Please provide a token', 400));

		// hash the new password
		const hash = await bcrypt.hash(password, 12);

		// update the user password and reset token stuff
		const { data, error } = await supabase
			.from('users')
			.update({
				password: hash,
				password_reset_token: null,
			})
			.select('*')
			.eq('password_reset_token', token);

		if (error) return next(new AppError(error.message));
		if (data.length === 0) return next(new AppError('Invalid Token', 400));

		createSendToken(data[0], 200, req, res);
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

// limitate access to only logged in users
export const protect = async (req, res, next) => {
	try {
		let token;
		// 1) Getting token and check of it's there
		if (
			req.headers.authorization && //
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} // else if (req.cookies.jwt) {
		// 	token = req.cookies.jwt;
		// }

		if (!token) {
			return next(new AppError('You are not logged in! Please log in to get access', 401));
		}

		// 2) Verification token
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		const { data, error } = await supabase.from('users').select('*').eq('id', decoded.id);

		if (error) return next(new AppError(error.message));
		if (data.length === 0) return next(new AppError('There are no user with this jwt', 403));

		data[0].password = null;

		// GRANT ACCESS TO PROTECTED ROUTE
		req.user = data[0];
		res.locals.user = data[0];
		next();
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return next(new AppError('Your JsonWebToken is malformed'), 400);
		}
		return next(new AppError(err.message), 400);
	}
};

export const restrictToAdmin = (req, res, next) => {
	if (!req.user.is_admin) {
		return next(new AppError('You do not have permission to perform this action', 403));
	}
	next();
};
