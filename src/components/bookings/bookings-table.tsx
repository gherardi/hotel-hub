import { useBookings } from '@/hooks/useBookings';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { BookingRow } from './booking-row';

export function BookingsTable() {
	const { bookings, isLoading } = useBookings();

	if (isLoading)
		return (
			<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
				<div className='absolute inset-0'>
					<ScrollArea className='w-full h-full p-5'>
						Loading bookings...
					</ScrollArea>
				</div>
			</div>
		);

	if (!bookings?.length)
		return (
			<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
				<div className='absolute inset-0'>
					<ScrollArea className='w-full h-full p-5'>
						No bookings found
					</ScrollArea>
				</div>
			</div>
		);

	return (
		<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
			<div className='absolute inset-0'>
				<ScrollArea className='w-full h-full p-5'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Cliente</TableHead>
								<TableHead>Codice camera</TableHead>
								<TableHead className='hidden md:table-cell'>Check in</TableHead>
								<TableHead className='hidden md:table-cell'>
									Check out
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Prezzo totale
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Data di creazione
								</TableHead>
								<TableHead>
									<span className='sr-only'>Azioni</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{bookings.map((booking) => (
								<BookingRow booking={booking} key={booking.id} />
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
		</div>
	);
}
