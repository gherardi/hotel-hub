import { merge, get } from 'lodash';

import ApplicationError from '../utils/applicationError';
import handleAsyncError from '../utils/handleAsyncError';
import { Tables } from '../types/database.types';
import supabase from '../services/supabase-client';

export const getOurbookings = handleAsyncError(async (req, res, next) => {
	const user = get(req, 'user') as unknown as Tables<'users'>;

	const { hotel_id } = user;
	if (!hotel_id)
		return next(new ApplicationError('No hotel_id found for this user', 400));

	const { data, error } = await supabase
		.from('bookings')
		// .select(`*, rooms (*)`)
		.select(`*`)
		.eq('hotel_id', hotel_id);

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const createBooking = handleAsyncError(async (req, res, next) => {
	const user = get(req, 'user') as unknown as Tables<'users'>;

	const { hotel_id } = user;
	if (!hotel_id)
		return next(new ApplicationError('No hotel_id found for this user', 400));

	const {
		customer_fullname,
		start_date,
		end_date,
		room_id,
		num_guests,
		observations,
	} = req.body;

	const nights = Math.floor(
		(new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)
	);

	const { data: room } = await supabase
		.from('rooms')
		.select('*')
		.eq('id', room_id)
		.single();

	const pricePerNight = room?.price ? room.price : 0;
	const totalPrice = nights * pricePerNight;

	const { data, error } = await supabase
		.from('bookings')
		.insert({
			customer_fullname,
			start_date,
			end_date,
			num_guests,
			num_nights: nights,
			room_id,
			room_price: pricePerNight,
			total_price: totalPrice,
			hotel_id,
			observations
		})
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
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
	const { id } = req.params;

	const { data, error } = await supabase
		.from('bookings')
		.delete()
		.eq('id', id as string)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Booking not found', 404));

	res.status(200).json({ status: 'success', data });
});
