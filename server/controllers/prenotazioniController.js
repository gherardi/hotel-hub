import supabase from '../utils/supabase.js';
import AppError from '../utils/appError.js';

export const prenotazioni = async (req, res, next) => {
	const { data, error } = await supabase
		.from('bookings')
		.select(`*, rooms (number)`)
		.eq('hotel_id', req.user.hotel_id);

	if (error) return next(new AppError(error.message));

	res.status(200).json({ status: 'success', data });
};
