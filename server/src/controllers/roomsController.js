import supabase from '../src/utils/supabase.js';
import AppError from '../src/utils/appError.js';

export const getOurRooms = async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('rooms')
			.select('*, hotel(name)')
			.eq('hotel_id', req.user.hotel_id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return next(new AppError('Your JsonWebToken is malformed'), 400);
		}
		next(new AppError(err.message ? err.message : err));
	}
};

export const createRoom = async (req, res, next) => {
	try {
		const { type, price, number } = req.body;
		const { hotel_id } = req.user;
		const { data, error } = await supabase.from('rooms').insert({
			type,
			price,
			number,
			hotel_id,
		});

		if (error) return next(new AppError(error.message));

		res.status(201).json({ status: 'success', data });
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return next(new AppError('Your JsonWebToken is malformed'), 400);
		}
		next(new AppError(err.message ? err.message : err));
	}
};

export const updateRoom = async (req, res, next) => {
	try {
		const { type, price, number } = req.body;
		const { error } = await supabase
			.from('rooms')
			.update({ type, price, number })
			.eq('id', req.params.id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success' });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const deleteRoom = async (req, res, next) => {
	try {
		const { error } = await supabase
			.from('rooms')
			.delete()
			.eq('id', req.params.id);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success' });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};
