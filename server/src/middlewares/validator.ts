import { RequestHandler } from 'express';
import validator from 'validator';
import { strongPasswordOptions } from '../utils/schemas';
import ApplicationError from '../utils/applicationError';

export const signup: RequestHandler = function (req, res, next) {
	next();

	// validate first and last name
	req.body.first_name = req.body.first_name.trim();
	req.body.last_name = req.body.last_name.trim();
	const { first_name, last_name } = req.body;
	if (!first_name || !last_name) {
		return next(
			new ApplicationError('Please provide your first name and last name!', 400)
		);
	}
	// validate email
	req.body.email = req.body.email.trim();
	req.body.email = req.body.email.toLowerCase();
	const { email } = req.body;
	if (!email) {
		return next(new ApplicationError('Please provide your email!', 400));
	}
	if (!validator.isEmail(email)) {
		return next(new ApplicationError('Please provide a valid email!', 400));
	}
	// validate hotel_code
	req.body.hotel_code = req.body.hotel_code.trim();
	const { hotel_code } = req.body;
	if (!hotel_code) {
		return next(new ApplicationError('Please provide your hotel code!', 400));
	}
	// validate password
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
};
