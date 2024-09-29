import { create } from 'zustand';
import { type Tables } from '@/database/database.types';
import { supabase } from '@/database/supabase-client';

type Booking = Tables<'bookings'>;

type BookingStore = {
	isFetching: boolean;
	bookings: Booking[];
	updateBookings: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
	isFetching: false,
	bookings: [],
	updateBookings: async () => {
		set({ isFetching: true });

		const { data: bookings, error } = await supabase
			.from('bookings')
			.select('*');

		if (error) alert('errore');
		else if (bookings) {
			bookings.sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
			set({ bookings });
		}

		set({ isFetching: false });
	},
}));
