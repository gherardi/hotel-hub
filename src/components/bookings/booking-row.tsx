import { MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tables } from '@/database/database.types';
import { Button } from '@/components/ui/button';
import { useDeleteBooking } from '@/hooks/useDeleteBooking';

type BookingRowProps = {
	booking: Tables<'bookings'>;
};

export function BookingRow({ booking }: BookingRowProps) {
	const { deleteBooking } = useDeleteBooking();

	function handleDelete(id: string) {
		deleteBooking(id);
	}

	return (
		<TableRow key={booking.id}>
			<TableCell className='font-medium'>{booking.customer_fullname}</TableCell>
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
	);
}
