import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BookingsContent } from '@/components/bookings/bookings-content';
import { BookingsCreationDialog } from '@/components/bookings/bookings-creation-dialog';
import { useBookingStore } from '@/stores/booking-store';

export default function Bookings() {
	const [open, setOpen] = useState(false);
	const bookings = useBookingStore((state) => state.bookings);

	return (
		<>
			<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-lg font-semibold md:text-2xl'>Prenotazioni</h1>
					{bookings.length !== 0 && (
						<Button
							size='sm'
							className='h-8 gap-1'
							onClick={() => setOpen(true)}
						>
							<PlusCircle className='w-4 h-4' />
							<p className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
								Aggiungi
							</p>
						</Button>
					)}
				</div>

				<BookingsContent setOpen={setOpen} />
			</main>
			<BookingsCreationDialog open={open} setOpen={setOpen} />
		</>
	);
}
