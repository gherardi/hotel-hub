import supabase from '../utils/supabase.js';
import AppError from '../utils/appError.js';

export const existingEmails = async (req, res, next) => {
	try {
		const { email } = req.params;

		const { data, error } = await supabase
			.from('albergatori')
			.select('email')
			.like('email', `${email}%`);

		if (error) return next(new AppError(error.message));

		res.status(200).json({ status: 'success', data });
	} catch (err) {
		next(new AppError(err.message ? err.message : err));
	}
};
