import { RequestHandler } from 'express';
import validator from 'validator';
import { strongPasswordOptions } from '../utils/schemas';
import ApplicationError from '../utils/applicationError';

export const name: RequestHandler = function (req, res, next) {
	req.body.first_name = req.body.first_name.trim();
	req.body.last_name = req.body.last_name.trim();

	const { first_name, last_name } = req.body;

	if (!first_name || !last_name) {
		return next(
			new ApplicationError('Please provide your first name and last name!', 400)
		);
	}

	next();
};

export const email: RequestHandler = function (req, res, next) {
	req.body.email = req.body.email.trim();
	req.body.email = req.body.email.toLowerCase();

	const { email } = req.body;

	if (!email) {
		return next(new ApplicationError('Please provide your email!', 400));
	}

	if (!validator.isEmail(email)) {
		return next(new ApplicationError('Please provide a valid email!', 400));
	}

	next();
};

export const password: RequestHandler = function (req, res, next) {
	req.body.password = req.body.password.trim();

	const { password } = req.body;

	if (!password) {
		return next(new ApplicationError('Please provide your password!', 400));
	}

	if (!validator.isStrongPassword(password, strongPasswordOptions)) {
		return next(
			new ApplicationError('Please provide a stronger password!', 400)
		);
	}

	next();
};
