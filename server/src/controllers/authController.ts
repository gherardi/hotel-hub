import { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { merge, get } from 'lodash';
// import { promisify } from 'util';

import { Tables } from '../types/database.types';
import supabase from '../services/supabase-client';
import handleAsyncError from '../utils/handleAsyncError';
import ApplicationError from '../utils/applicationError';
import { sendPasswordResetEmail } from '../services/resend';

import { env } from '../utils/env';

const signToken = (id: string) => {
	return jwt.sign({ id }, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user: Tables<'users'>, res: Response) => {
	const token = signToken(user.id);

	res.cookie('jwt', token, {
		httpOnly: true,
		// TODO:
		// expiresIn: new Date(
		// 	Date.now() + Number(env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		// ),
	});

	res.status(200).json({
		status: 'success',
		token,
		isAdmin: user.is_admin,
	});
};

export const signup = handleAsyncError(async (req, res, next) => {
	const { first_name, last_name, email, password, hotel_id } = req.body;

	const hash = await bcrypt.hash(password, Number(env.SALT));

	const { data: user, error } = await supabase
		.from('users')
		.insert({
			first_name,
			last_name,
			email,
			password: hash,
			...(hotel_id ? hotel_id : null),
		})
		.select()
		.single<Tables<'users'>>();

	if (error) {
		if (error.code === '23505')
			return next(
				new ApplicationError('Email already taken, try another one', 409)
			);

		return next(new ApplicationError(error.message));
	}

	createSendToken(user, res);
});

export const login = handleAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('email', email)
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));

	// CHECK IF QUERY HAS RETURNED A USER
	if (!user)
		return next(new ApplicationError('Incorrect email or password', 401));

	// 2) CHECK IF PASSWORD IS CORRECT
	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword)
		return next(new ApplicationError('Incorrect password', 401));

	// REMOVE THE PASSWORD RESET TOKEN FROM THE USER
	await supabase
		.from('users')
		.update({ password_reset_token: null })
		.eq('id', user.id);

	createSendToken(user, res);
});

export const logout: RequestHandler = (req, res, next) => {
	if (req.cookies.jwt) {
		res.clearCookie('jwt');
	}
	// TODO: delete req.user;

	res.status(200).json({ status: 'success' });
};

export const forgotPassword = handleAsyncError(async (req, res, next) => {
	const { email } = req.body;

	const token = crypto.randomUUID();

	const { data: user, error } = await supabase
		.from('users')
		.update({
			password_reset_token: token,
		})
		.eq('email', email)
		.select('*')
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!user)
		return next(new ApplicationError('No account found with this email', 401));

	// const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
	const resetURL = `${req.protocol}://localhost:5173/reset-password/${token}`;

	await sendPasswordResetEmail(user.email, resetURL);

	res.status(200).json({ status: 'success' });
});

export const resetPassword = handleAsyncError(async (req, res, next) => {
	const { token } = req.params;
	const { password } = req.body;

	if (!token) return next(new ApplicationError('Please provide a token', 400));

	const hash = await bcrypt.hash(password, Number(process.env.SALT));

	const { data: user, error } = await supabase
		.from('users')
		.update({
			password: hash,
			password_reset_token: null,
		})
		.eq('password_reset_token', token)
		.select('*')
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!user) return next(new ApplicationError('Invalid Token', 400));

	createSendToken(user, res);
});

// LIMITATE ACCESS TO ONLY LOGGED IN USERS
export const protect = handleAsyncError(async (req, res, next) => {
	let token;
	// 1) GETTING TOKEN AND CHECK OF IT'S THERE
	if (
		req.headers.authorization && //
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(
			new ApplicationError(
				'You are not logged in! Please log in to get access',
				401
			)
		);
	}

	// TODO: 2) Verification token
	// const decoded = (await promisify(jwt.verify)(
	// 	token,
	// 	env.JWT_SECRET
	// )) as unknown as User;

	jwt.verify(token, env.JWT_SECRET, async function (err: any, decoded: any) {
		if (err) {
			// Handle the error appropriately
			console.error('Token verification failed:', err.message);
			return next(new ApplicationError(err.message, 401));
		} else {
			decoded as Tables<'users'>;
			// Token is successfully verified
			console.log('Token is valid. Decoded payload:', decoded);
			const { data: user, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', decoded.id)
				.single<Tables<'users'>>();

			if (error) return next(new ApplicationError(error.message));
			if (!user)
				return next(
					new ApplicationError('There are no user with this jwt', 403)
				);

			user.password = '';

			// TODO: GRANT ACCESS TO PROTECTED ROUTE
			merge(req, { user });
			// req.user = user;
			next();
		}
	});
});

export const restrictToAdmin: RequestHandler = (req, res, next) => {
	// TODO: CHECK IF IT WORKS
	const user = get(req, 'user', {} as Tables<'users'>);

	if (!user.is_admin) {
		return next(
			new ApplicationError(
				'You do not have permission to perform this action',
				403
			)
		);
	}
	next();
};
