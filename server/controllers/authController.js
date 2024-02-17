import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';
import validator from 'validator';

import supabase from './../utils/supabase.js';
import AppError from './../utils/appError.js';
import Email from './../utils/sendEmail.js';

dotenv.config();

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// todo: quando faccio il login, imposto il password_reset_token a null e password_reset_token_expires a null

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);

	res.cookie('jwt', token, {
		httpOnly: true,
		// secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		// expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
	});

	// Remove password from output
	user.password = null;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

export const signup = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const hash = await bcrypt.hash(password, 12);

		const { data, error } = await supabase
			.from('albergatori')
			.insert([
				{
					name,
					email,
					password: hash,
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

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		let { data, error } = await supabase.from('albergatori').select('*').eq('email', email);

		// Check if query has returned an error
		if (error) return next(new AppError(error.message));

		// Check if query has returned a user
		if (data.length === 0) return next(new AppError('Incorrect email or password', 401));

		// 2) Check if password is correct
		const correctPassword = await bcrypt.compare(password, data[0].password);
		if (!correctPassword) return next(new AppError('Incorrect password', 401));

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

export const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;

		req.body.email = email.trim();
		req.body.email = email.toLowerCase();

		if (!email) {
			return next(new AppError('Please provide your email!', 400));
		}

		if (!validator.isEmail(email)) {
			return next(new AppError('Please provide a valid email!', 400));
		}

		const token = crypto.randomUUID();

		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + process.env.PASSWORD_RESET_EXPIRES_IN);

		const { data, error } = await supabase
			.from('albergatori')
			.update({
				password_reset_token: token,
				password_reset_token_expires: expires.toISOString(),
			})
			.eq('email', email)
			.select('email');

		if (error) return next(new AppError(error.message));

		if (data.length === 0) return next(new AppError('No account found with that email', 401));

		const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${token}`;

		await new Email(email, resetURL).sendPasswordReset();

		res.status(200).json({
			status: 'success',
			message: 'ResetURL sent to email!',
		});
	} catch (err) {
		return next(new AppError('There was an error sending the email. Try again later!'), 500);
	}
};

export const resetPassword = async (req, res, next) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		if (!token) return next(new AppError('Please provide a token', 400));
		if (!password) return next(new AppError('Please provide a valid password', 400));
		if (!validator.isStrongPassword(password)) {
			return next(new AppError('Please provide a strong password!', 400));
		}

		const hash = await bcrypt.hash(password, 12);

		let { data, error } = await supabase
			.from('albergatori')
			.select('*')
			.eq('password_reset_token', token)
			.gt('password_reset_token_expires', new Date().toISOString());

		if (error) return next(new AppError(error.message));

		if (data.length === 0) return next(new AppError('Token is invalid or has expired', 400));

		const { error1 } = await supabase
			.from('albergatori')
			.update({ password: hash, password_reset_token: null, password_reset_token_expires: null })
			.eq('id', data[0].id);

		if (error) return next(new AppError(error.message));

		createSendToken(data[0], 200, req, res);
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const existingEmails = async (req, res, next) => {
	try {
		const { email } = req.params;

		const { data, error } = await supabase
			.from('albergatori')
			.select('email')
			.like('email', `${email}%`);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const protect = async (req, res, next) => {
	try {
		let token;
		// 1) Getting token and check of it's there
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			return next(new AppError('You are not logged in! Please log in to get access', 401));
		}

		// 2) Verification token

		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		console.log(decoded);

		// 3) Check if user still exists
		// const currentUser = await User.findById(decoded.id);
		// if (!currentUser) {
		// 	return next(
		// 		new AppError(
		// 			'The user belonging to this token does no longer exist.',
		// 			401
		// 		)
		// 	);
		// }

		// 4) Check if user changed password after the token was issued
		// if (currentUser.changedPasswordAfter(decoded.iat)) {
		// 	return next(
		// 		new AppError('User recently changed password! Please log in again.', 401)
		// 	);
		// }

		// GRANT ACCESS TO PROTECTED ROUTE
		// req.user = currentUser;
		// res.locals.user = currentUser;
		next();
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return next(new AppError('Your JsonWebToken is malformed'), 400);
		}
		return next(new AppError(err.message), 400);
	}
};
