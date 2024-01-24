import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import supabase from './../utils/supabase.js';
import AppError from './../utils/appError.js';
// import Email from './../utils/sendEmail.js';

dotenv.config();

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);

	// res.cookie('jwt', token, {
	// 	expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
	// 	httpOnly: true,
	// 	secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
	// });

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

		if (error) return next(new AppError(error.message));

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

		// 1) Check if email and password exist
		if (!email || !password) {
			return next(new AppError('Please provide email and password!', 400));
		}

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

export const forgotPassword = (req, res, next) => {
	try {
		// res.status(501).json({ status: 'error', message: 'This route is not yet defined!' });
		next(new AppError('This route is not yet defined!', 501));
	} catch (err) {}
};
export const resetPassword = (req, res, next) => {
	try {
		next(new AppError('This route is not yet defined!', 501));
	} catch (err) {}
};
