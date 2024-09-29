import { useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

import { useBookingStore } from '@/stores/booking-store';
import { BookingsSkeleton } from '@/components/bookings/bookings-skeleton';
import { BookingsPlaceholder } from '@/components/bookings/bookings-placeholder';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { supabase } from '@/database/supabase-client';
import { useToast } from '@/hooks/use-toast';

type BookingsContentProps = {
	setOpen: (open: boolean) => void;
};

export function BookingsContent({ setOpen }: BookingsContentProps) {
	const { toast } = useToast();
	const bookings = useBookingStore((state) => state.bookings);
	const updateBookings = useBookingStore((state) => state.updateBookings);
	const isFetching = useBookingStore((state) => state.isFetching);

	const handleDelete = async (id: string) => {
		// Delete booking
		const { data, error } = await supabase
			.from('bookings')
			.delete()
			.eq('id', id)
			.select();

		if (error) {
			toast({
				variant: 'destructive',
				title: 'Errore',
				description:
					"Si è verificato un errore durante l'eliminazione della prenotazione.",
			});
			return;
		}
		if (data) {
			toast({
				title: 'Prenotazione eliminata',
				description: 'La prenotazione è stata eliminata con successo.',
			});
			updateBookings();
		}
	};

	useEffect(() => {
		// Fetch bookings
		updateBookings();
	}, []);

	if (isFetching) return <BookingsSkeleton />;

	if (bookings.length === 0) return <BookingsPlaceholder setOpen={setOpen} />;

	return (
		<div className='relative flex-1'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Cliente</TableHead>
						<TableHead>Codice camera</TableHead>
						<TableHead className='hidden md:table-cell'>Check in</TableHead>
						<TableHead className='hidden md:table-cell'>Check out</TableHead>
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
						<TableRow key={booking.id}>
							<TableCell className='font-medium'>
								{booking.customer_fullname}
							</TableCell>
							<TableCell className='font-medium'>{booking.room_code}</TableCell>
							<TableCell className='hidden md:table-cell'>
								{new Date(booking.check_in).toLocaleDateString()}
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								{new Date(booking.check_out).toLocaleDateString()}
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								{booking.booking_price}€
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								{new Date(booking.created_at).toLocaleString()}
							</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup='true' size='icon' variant='ghost'>
											<MoreHorizontal className='w-4 h-4' />
											<span className='sr-only'>Azioni</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>Azioni</DropdownMenuLabel>
										{/* <DropdownMenuItem>Modifica</DropdownMenuItem> */}
										<DropdownMenuItem onClick={() => handleDelete(booking.id)}>
											Elimina
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
