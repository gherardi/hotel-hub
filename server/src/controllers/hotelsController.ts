import supabase from '../services/supabase-client';
import handleAsyncError from '../utils/handleAsyncError';
import ApplicationError from '../utils/applicationError';

import { Tables } from '../types/database.types';

export const getAllHotels = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase
		.from('hotels')
		.select('*')
		.returns<Tables<'hotels'>[]>();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const getHotel = handleAsyncError(async (req, res, next) => {
	// TODO: AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { data, error } = await supabase
		.from('hotels')
		.select('*')
		.eq('id', id)
		.single<Tables<'hotels'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const createHotel = handleAsyncError(async (req, res, next) => {
	// name are required
	const { name, code } = req.body;

	if (!name) {
		return next(new ApplicationError('Name is required', 400));
	}

	const { data, error } = await supabase
		.from('hotels')
		.insert({ name, code })
		.select('*')
		.single<Tables<'hotels'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateHotel = handleAsyncError(async (req, res, next) => {
  // TODO: AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { name } = req.body;

	if (!name) {
		return next(new ApplicationError('Name is required', 400));
	}

	const { data, error } = await supabase
		.from('hotels')
		.update({ name })
		.eq('id', id)
		.select('*')
		.single<Tables<'hotels'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Hotel not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteHotel = handleAsyncError(async (req, res, next) => {
  // TODO: AGGIUGNERE UN VALIDATORE PER FARE CONTROLLO ID SE PRESENTE COME MIDDLEWARE SOTTO
	const id = req.params.id || 1;

	const { data, error } = await supabase
		.from('hotels')
		.delete()
		.eq('id', id)
		.select()
		.single<Tables<'hotels'>>();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Hotel not found', 404));

	res.status(204).json({ status: 'success' });
});
