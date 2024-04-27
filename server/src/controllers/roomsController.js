import supabase from '../utils/supabase.js';
import ApplicationError from '../utils/applicationError.js';
import handleAsyncError from '../utils/handleAsyncError.js';

export const getOurRooms = handleAsyncError(async (req, res, next) => {
	const { hotel_id } = req.user;

	const { data, error } = await supabase
		.from('rooms')
		.select('*, hotels(*)')
		.eq('hotel_id', hotel_id);

	if (error) return next(new ApplicationError(error.message));

	res.status(200).json({ status: 'success', data });
});

export const createRoom = handleAsyncError(async (req, res, next) => {
	const { capacity, price, number } = req.body;
	const { hotel_id } = req.user;

	const { data, error } = await supabase
		.from('rooms')
		.insert({
			capacity,
			price,
			number,
			hotel_id,
		})
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));

	res.status(201).json({ status: 'success', data });
});

export const updateRoom = handleAsyncError(async (req, res, next) => {
	const { id } = req.params;
	const { type, price, number } = req.body;

	const { data, error } = await supabase
		.from('rooms')
		.update({ type, price, number })
		.eq('id', id)
		.select()
		.maybeSingle();

	if (error) return next(new ApplicationError(error.message));
	if (!data) return next(new ApplicationError('Room not found', 404));

	res.status(200).json({ status: 'success', data });
});

export const deleteRoom = handleAsyncError(async (req, res, next) => {
	const { data, error } = await supabase
		.from('rooms')
		.delete()
		.eq('id', req.params.id)
		.select()
		.maybeSingle();

	if (error) return next(new AppError(error.message));
	if (!data) return next(new AppError('Room not found', 404));

	res.status(200).json({ status: 'success', data });
});
