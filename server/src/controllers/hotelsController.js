import supabase from '../src/utils/supabase.js';
import AppError from '../src/utils/appError.js';

export const getAllHotels = async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('hotels').select('*');

		if (error) {
			return next(new AppError(error.message));
		}

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const createHotel = async (req, res, next) => {
	try {
		// create the hotel
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const updateHotel = async (req, res, next) => {
	try {
		const { id } = req.params;
		// update the hotel
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};

export const deleteHotel = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { error } = await supabase.from('hotels').delete().eq('id', id);
		if (error) return next(new AppError(error.message));
		res.status(200).json({ status: 'success', message: 'Hotel deleted' });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};
