import supabase from '../utils/supabase.js';
import AppError from '../utils/appError.js';

export const getAllRooms = async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('rooms').select('*, hotel(name)');

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return next(new AppError('Your JsonWebToken is malformed'), 400);
		}
		next(new AppError(err.message ? err.message : err));
	}
};
