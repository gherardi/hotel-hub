import supabase from '../utils/supabase.js';
import handleAsyncError from '../utils/handleAsyncError.js';
import ApplicationError from '../utils/applicationError.js';

export const getAllHotels = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase.from('hotels').select('*');

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const getHotel = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { data, error } = await supabase
		.from('hotels')
		.select('*')
		.eq('id', id)
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const createHotel = handleAsyncError(async (req, res, next) => {
	// name are required
	const { name } = req.body;

	if (!name) {
		return next(new ApplicationError('Name is required', 400));
	}

	const { data, error } = await supabase
		.from('hotels')
		.insert({ name })
		.select('*')
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateHotel = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { name } = req.body;

	if (!name) {
		return next(new ApplicationError('Name is required', 400));
	}

	const { data, error } = await supabase
		.from('hotels')
		.update({ name })
		.eq('id', id)
		.select('*')
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Hotel not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteHotel = handleAsyncError(async (req, res, next) => {
	const id = req.params.id;

	const { data, error } = await supabase
		.from('hotels')
		.delete()
		.eq('id', id)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Hotel not found', 404));

	res.status(204).json({ status: 'success' });
});
