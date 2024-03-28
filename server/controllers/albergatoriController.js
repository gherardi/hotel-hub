import supabase from '../utils/supabase.js';
import AppError from '../utils/appError.js';

// export const existingEmails = async (req, res, next) => {
// 	try {
// 		const { email } = req.params;

// 		const { data, error } = await supabase
// 			.from('albergatori')
// 			.select('email')
// 			.like('email', `${email}%`);

// 		if (error) return next(new AppError(error.message));

// 		res.status(200).json({ status: 'success', data });
// 	} catch (err) {
// 		next(new AppError(err.message ? err.message : err));
// 	}
// };

export const getMe = async (req, res, next) => {
	const { data, error } = await supabase.from('users').select('*').eq('id', req.user.id);

	if (error) return next(new AppError(error.message));

	res.status(200).json({ status: 'success', data: data[0] });
};

export const updateMe = async (req, res, next) => {
	const { name, email } = req.body;

	const { data, error } = await supabase
		.from('users')
		.update({ name, email })
		.eq('id', req.user.id);

	if (error) return next(new AppError(error.message));

	res.status(200).json({ status: 'success', message: 'credentials changed' });
};

export const getUser = async (req, res, next) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const updateUser = async (req, res, next) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const getAllUsers = async (req, res, next) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const deleteUser = async (req, res, next) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};
