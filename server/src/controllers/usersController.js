import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import supabase from '../utils/supabase.js';
import ApplicationError from '../utils/applicationError.js';
import handleAsyncError from '../utils/handleAsyncError.js';

dotenv.config();

// export const existingEmails = async (req, res, next) => {
// 	try {
// 		const { email } = req.params;

// 		const { data, error } = await supabase
// 			.from('albergatori')
// 			.select('email')
// 			.like('email', `${email}%`);

// 		if (error) return next(new ApplicationError(error.message));

// 		res.status(200).json({ status: 'success', data });
// 	} catch (err) {
// 		next(new ApplicationError(err.message ? err.message : err));
// 	}
// };

export const getMe = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', req.user.id)
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	delete data.password;

	res.status(200).json({ status: 'success', data });
});

export const updateMe = handleAsyncError(async (req, res, next) => {
	const { first_name, last_name, email, password } = req.body;

	const hash = await bcrypt.hash(password, 12);

	const { data, error } = await supabase
		.from('users')
		.update({ first_name, last_name, email, password: hash })
		.eq('id', req.user.id)
		.select('*')
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const dashboard = handleAsyncError(async (req, res, next) => {
	const { hotel_id } = req.user;

	const { data: prenotazioni } = await supabase
		.from('bookings')
		.select('*')
		.eq('hotel_id', hotel_id);

	const vendite = prenotazioni.reduce((acc, curr) => acc + curr.total, 0);

	const { data: stanze } = await supabase
		.from('rooms')
		.select('*')
		.eq('hotel_id', hotel_id);

	const tassoOccupazione = (prenotazioni.length / stanze.length) * 100;

	res
		.status(200)
		.json({ status: 'success', prenotazioni, vendite, tassoOccupazione });
});

// nel frontend fare un get a /me ed escludere l'utente con lo stesso id
export const getAllUsers = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase.from('users').select('*');

	if (error) return next(new ApplicationError(error.message));

	data.forEach((user) => delete user.password);

	res.status(200).json({ status: 'success', data });
});

export const getUser = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('User not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const createUser = handleAsyncError(async (req, res, next) => {
	const { first_name, last_name, email, password } = req.body;

	const hash = await bcrypt.hash(password, process.env.SALT);

	const { data, error } = await supabase
		.from('users')
		.insert({ first_name, last_name, email, password: hash })
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateUser = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { first_name, last_name, email, password } = req.body;

	const hash = await bcrypt.hash(password, process.env.SALT);

	const { data, error } = await supabase
		.from('users')
		.update({ first_name, last_name, email, password: hash })
		.eq('id', id)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('User not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteUser = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { data, error } = await supabase
		.from('users')
		.delete()
		.eq('id', id)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('User not found', 404));

	res.status(204).json({ status: 'success' });
});
