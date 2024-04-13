import { z } from 'zod';
import validator from 'validator';

const strongPasswordOptions = {
	minUppercase: 0,
	minNumbers: 0,
	minLength: 8,
	minSymbols: 1,
};

const validateName = (errMessage) =>
	z.string().refine((value) => !!value, {
		message: errMessage,
	});

const validateEmail = z
	.string()
	.refine((value) => !!value, {
		message: 'Please provide your email!',
	})
	.refine((value) => validator.isEmail(value), {
		message: 'Please provide a valid email!',
	});

const validatePassword = z
	.string()
	.min(8, {
		message: 'Password must be at least 8 characters long!',
	})
	.refine((value) => validator.isStrongPassword(value, strongPasswordOptions), {
		message: 'Password should contains at leats one symbol',
	});

const validateHotelId = z.string().refine((value) => !!value, {
	message: 'Please select an hotel!',
});

export const signupSchema = z.object({
	first_name: validateName('Please provide your first name!'),
	last_name: validateName('Please provide your last name!'),
	email: validateEmail,
	password: validatePassword,
	hotel_id: validateHotelId,
});
