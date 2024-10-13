import { supabase } from '@/database/supabase-client';

export async function getBookings() {
	const { data, error } = await supabase.from('bookings').select('*');

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded');
	}

	return data;
}

type CreateBookingSchema = {
	customer_fullname: string;
	check_in: string;
	check_out: string;
	room_price: number;
	room_discount: number;
	room_id: string;
	booking_price: number;
	notes?: string;
	room_code: string;
};

export async function createBooking(booking: CreateBookingSchema) {
	const { data, error } = await supabase
		.from('bookings')
		.insert([booking as any])
		.select();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be created');
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
