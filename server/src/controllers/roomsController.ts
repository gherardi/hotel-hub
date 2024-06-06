import { get } from 'lodash';

import supabase from '../services/supabase-client';
import ApplicationError from '../utils/applicationError';
import handleAsyncError from '../utils/handleAsyncError';

import { Tables } from '../types/database.types';

export const getOurRooms = handleAsyncError(async (req, res, next) => {
	const { hotel_id } = get(req, 'user', {} as Tables<'users'>);

	const { data, error } = await supabase
		.from('rooms')
		.select('*, hotels(*)')
		.eq('hotel_id', hotel_id as string)
		.returns<Tables<'rooms'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const createRoom = handleAsyncError(async (req, res, next) => {
	const { capacity, price, name } = req.body;
	const { hotel_id } = get(req, 'user', {} as Tables<'users'>);

	console.log('CREANDO CAMERA', capacity, price, name, hotel_id);

	if (!hotel_id) return next(new ApplicationError('Hotel not found', 404));

	const { data, error } = await supabase
		.from('rooms')
		.insert({
			name,
			price,
			capacity,
			hotel_id,
		})
		.select()
		.single<Tables<'rooms'>>();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateRoom = handleAsyncError(async (req, res, next) => {
	const { id } = req.params;
	const { type, price, number } = req.body;

	const { data, error } = await supabase
		.from('rooms')
		.update({ type, price, number })
		.eq('id', id as string)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Room not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteRoom = handleAsyncError(async (req, res, next) => {
	const { id } = req.params;

	const { data, error } = await supabase
		.from('rooms')
		.delete()
		.eq('id', id as string)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Room not found', 404));

	res.status(200).json({ status: 'success', data });
});
