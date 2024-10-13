import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookingsTable } from '@/components/bookings/bookings-table';
import { BookingModal } from '@/components/bookings/booking-modal';

export default function Bookings() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-lg font-semibold md:text-2xl'>Prenotazioni</h1>
				<Button size='sm' className='h-8' onClick={() => setModalOpen(true)}>
					<p className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						Aggiungi
					</p>
				</Button>
			</div>

			<BookingsTable />

			<BookingModal open={modalOpen} setOpen={setModalOpen} />
		</main>
	);
}
