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

	data[0].password = '';

	res.status(200).json({ status: 'success', data: data[0] });
};

export const updateMe = async (req, res, next) => {
	const { name, email, password } = req.body;

	const { error } = await supabase
		.from('users')
		.update({ name, email, password })
		.eq('id', req.user.id);

	if (error) return next(new AppError(error.message));

	res.status(200).json({ status: 'success', message: 'credentials changed' });
};

export const dashboard = async (req, res) => {
	const { hotel_id } = req.user;
	const { data: prenotazioni } = await supabase
		.from('bookings')
		.select('*')
		.eq('hotel_id', hotel_id);

	const vendite = prenotazioni.reduce((acc, curr) => acc + curr.total, 0);

	const { data: stanze } = await supabase.from('rooms').select('*').eq('hotel_id', hotel_id);

	const tassoOccupazione = (prenotazioni.length / stanze.length) * 100;

	res.status(200).json({ status: 'success', prenotazioni, vendite, tassoOccupazione });
};

export const getUser = async (req, res) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const updateUser = async (req, res) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const getAllUsers = async (req, res) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};

export const deleteUser = async (req, res) => {
	res.status(501).json({ status: 'error', message: 'Route not implemented yet' });
};
