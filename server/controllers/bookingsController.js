import supabase from '../utils/supabase.js';
import AppError from '../utils/appError.js';

export const getOurbookings = async (req, res, next) => {
	try {
		const { hotel_id } = req.user;
		const { data, error } = await supabase
			.from('bookings')
			.select(`*, rooms (number)`)
			.eq('hotel_id', hotel_id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err, 400));
	}
};

export const createBooking = async (req, res, next) => {
	try {
		const { customer_name, start, end, room_id } = req.body;
		// calculate the days between start and end
		const nights = Math.floor(
			(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
		);
		const {
			data: { price },
		} = await supabase.from('rooms').select('price').eq('id', room_id).single();

		const total = nights * price;
		console.log('notti', nights, 'prezzo', price, 'totale', total);
		const { id: user_id, hotel_id } = req.user;
		const { data, error } = await supabase.from('bookings').insert({
			customer_name,
			start,
			end,
			nights,
			total,
			user_id,
			hotel_id,
			room_id,
		});

		if (error) return next(new AppError(error.message));

		res.status(201).json({ status: 'success', data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err, 400));
	}
};

export const updateBooking = async (req, res, next) => {
	try {
		const { customer_name, start, end, room_id } = req.body;
		const nights = Math.floor(
			(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
		);
		const {
			data: { price },
		} = await supabase.from('rooms').select('price').eq('id', room_id).single();

		const total = nights * price;
		const { id: user_id, hotel_id } = req.user;
		const { error } = await supabase
			.from('bookings')
			.update({
				customer_name,
				start,
				end,
				nights,
				total,
				user_id,
				hotel_id,
				room_id,
			})
			.eq('id', req.params.id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success' });
	} catch (err) {
		next(new AppError(err.message ? err.message : err, 400));
	}
};

export const deleteBooking = async (req, res, next) => {
	try {
		const { error } = await supabase
			.from('bookings')
			.delete()
			.eq('id', req.params.id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success' });
	} catch (err) {
		next(new AppError(err.message ? err.message : err, 400));
	}
};
