import { merge, get } from 'lodash';

import supabase from '../services/supabase-client';
import ApplicationError from '../utils/applicationError';
import handleAsyncError from '../utils/handleAsyncError';

export const getOurbookings = handleAsyncError(async (req, res, next) => {
	// const user = get(req, 'user') as unknown as User;

	// const { hotel_id } = user;
	// const { data, error } = await supabase
	// 	.from('bookings')
	// 	.select(`*, rooms (*)`)
	// 	.eq('hotel_id', hotel_id);

	// if (error) return next(new ApplicationError(error.message));

	// res.status(200).json({ status: 'success', data });
	res
		.status(501)
		.json({ status: 'success', message: 'route not implemented yet! code: ' });
});

export const createBooking = handleAsyncError(async (req, res, next) => {
	// const {
	// 	customer_first_name,
	// 	customer_last_name,
	// 	start_date,
	// 	end_date,
	// 	room_id,
	// } = req.body;

	// const { id: created_by, hotel_id } = req.user;

	// // calculate the days between start and end
	// const nights = Math.floor(
	// 	(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
	// );
	// const {
	// 	data: { price },
	// } = await supabase.from('rooms').select('price').eq('id', room_id).single();

	// const total = nights * price;

	// const { data, error } = await supabase
	// 	.from('bookings')
	// 	.insert({
	// 		customer_name,
	// 		start,
	// 		end,
	// 		nights,
	// 		total,
	// 		user_id,
	// 		hotel_id,
	// 		room_id,
	// 	})
	// 	.select()
	// 	.maybeSingle();

	// if (error) return next(new ApplicationError(error.message));

	// res.status(201).json({ status: 'success', data });
	res
		.status(501)
		.json({ status: 'success', message: 'route not implemented yet! code: ' });
});

export const updateBooking = handleAsyncError(async (req, res, next) => {
	// const { customer_name, start, end, room_id } = req.body;
	// const nights = Math.floor(
	// 	(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
	// );
	// const {
	// 	data: { price },
	// } = await supabase.from('rooms').select('price').eq('id', room_id).single();

	// const total = nights * price;
	// const { id: user_id, hotel_id } = req.user;
	// const { data, error } = await supabase
	// 	.from('bookings')
	// 	.update({
	// 		customer_name,
	// 		start,
	// 		end,
	// 		nights,
	// 		total,
	// 		user_id,
	// 		hotel_id,
	// 		room_id,
	// 	})
	// 	.eq('id', req.params.id)
	// 	.select()
	// 	.maybeSingle();

	// if (error) return next(new ApplicationError(error.message));

	// res.status(200).json({ status: 'success', data });
	res
		.status(501)
		.json({ status: 'success', message: 'route not implemented yet! code: ' });
});

export const deleteBooking = handleAsyncError(async (req, res, next) => {
	// const { id } = req.params;
	// const { data, error } = await supabase
	// 	.from('bookings')
	// 	.delete()
	// 	.eq('id', id)
	// 	.select()
	// 	.single();

	// if (error) return next(new ApplicationError(error.message));
	// if (!data)
	// 	return next(new ApplicationError('No booking found with that ID', 404));

	// res.status(200).json({ status: 'success', data });
	res
		.status(501)
		.json({ status: 'success', message: 'route not implemented yet! code: ' });
});
