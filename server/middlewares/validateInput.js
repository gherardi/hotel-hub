import AppError from './../utils/appError.js';
import validator from 'validator';

const validNameRegex = /^[^0-9@#$%^]+(?:\s[^0-9@#$%^]+)+$/;

export const validateName = function (req, res, next) {
  req.body.name = req.body.name.trim();
  const { name } = req.body;

  if (!name) {
    return next(new AppError('Please provide your name!', 400));
  }

  if (!validNameRegex.test(name)) {
    return next(new AppError('Please provide a valid name!', 400));
  }
  next();
};

export const validateEmail = function (req, res, next) {
  req.body.email = req.body.email.trim();
  req.body.email = req.body.email.toLowerCase();
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide your email!', 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError('Please provide a valid email!', 400));
  }
  next();
};


export const validatePassword = function (req, res, next) {
	req.body.password = req.body.password.trim();
	const { password } = req.body;

	if (!password) {
		return next(new AppError('Please provide your password!', 400));
	}

	if (!validator.isStrongPassword(password)) {
		return next(new AppError('Please provide a stronger password!', 400));
	}
	next();
};
