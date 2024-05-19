import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { merge, get } from 'lodash';

import supabase from '../services/supabase-client';
import ApplicationError from '../utils/applicationError';
import handleAsyncError from '../utils/handleAsyncError';

import { Tables } from '../types/database.types';

dotenv.config();

// import { User } from '../types/User';

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
	const user = get(req, 'user', {} as Tables<'users'>);

	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));

	data.password = '';

	res.status(200).json({ status: 'success', data });
});

export const updateMe = handleAsyncError(async (req, res, next) => {
	const { first_name, last_name, email } = req.body;

	const user = get(req, 'user', {} as Tables<'users'>);

	const { data, error } = await supabase
		.from('users')
		.update({ first_name, last_name, email })
		.eq('id', user.id)
		.select('*')
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const dashboard = handleAsyncError(async (req, res, next) => {
	// const { hotel_id } = get(req, 'user', {} as User);

	// const { data: prenotazioni } = await supabase
	// 	.from('bookings')
	// 	.select('*')
	// 	.eq('hotel_id', hotel_id);

	// const vendite = prenotazioni.reduce((acc, curr) => acc + curr.total, 0);

	// const { data: stanze } = await supabase
	// 	.from('rooms')
	// 	.select('*')
	// 	.eq('hotel_id', hotel_id);

	// const tassoOccupazione = (prenotazioni.length / stanze.length) * 100;

	// res
	// 	.status(200)
	// 	.json({ status: 'success', prenotazioni, vendite, tassoOccupazione });
	res
		.status(501)
		.json({ status: 'success', message: 'route not implemented yet! code: ' });
});

// nel frontend fare un get a /me ed escludere l'utente con lo stesso id
export const getAllUsers = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase
		.from('users')
		.select('*, hotels(id, name)')
		.returns<Tables<'users'>[]>();
	// TODO: FIXARE CON QUERY NESTED DA DOCUMENTAZIONE

	if (error) return next(new ApplicationError(error.message));

	data.forEach((user) => (user.password = ''));

	res.status(200).json({ status: 'success', data });
});

export const getUser = handleAsyncError(async (req, res, next) => {
	// TODO AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.single<Tables<'users'>>();

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
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateUser = handleAsyncError(async (req, res, next) => {
	// TODO AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { first_name, last_name, email, password } = req.body;

	const hash = await bcrypt.hash(password, process.env.SALT);

	const { data, error } = await supabase
		.from('users')
		.update({ first_name, last_name, email, password: hash })
		.eq('id', id)
		.select()
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('User not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteUser = handleAsyncError(async (req, res, next) => {
	// TODO AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { data, error } = await supabase
		.from('users')
		.delete()
		.eq('id', id)
		.select()
		.single<Tables<'users'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('User not found', 404));

	res.status(204).json({ status: 'success' });
});
