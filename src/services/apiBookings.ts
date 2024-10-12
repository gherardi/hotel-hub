import { supabase } from '@/database/supabase-client';

export async function getBookings() {
	const { data, error } = await supabase.from('bookings').select('*');

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded');
	}

	return data;
}

export async function deleteBooking(id: string) {
	const { data, error } = await supabase
		.from('bookings')
		.delete()
		.eq('id', id)
		.select();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be deleted');
	}

	return data;
}
