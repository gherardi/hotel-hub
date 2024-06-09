import { useState } from 'react';
import PageLayout from '@/layouts/page-layout';
import { columns } from '@/components/bookings/columns';
import { DataTable } from '@/components/bookings/data-table';
import { useFetchBookings } from '@/hooks/useFetchBookings';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CreateBookingForm from '@/components/bookings/createBookingForm';

export default function Bookings() {
	const { data, isPending } = useFetchBookings();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<PageLayout>
			<div className='flex items-center justify-between space-y-2'>
				<h2 className='text-3xl font-bold tracking-tight'>Prenotazioni</h2>
				<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
					<AlertDialogTrigger asChild>
						<Button size='sm'>Nuova prenotazione</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Crea nuova prenotazioni</AlertDialogTitle>
							<AlertDialogDescription>
								Inserisci i dettagli per creare una nuova prenotazione.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<CreateBookingForm setIsOpen={setIsOpen} />
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<div className='space-y-4 pb-8 md:pb-0 h-[calc(var(--hero-height)-96px)] relative overflow-auto border-t border-border rounded'>
				{isPending ? 'fetching data...' : null}
				{data ? <DataTable columns={columns} data={data} /> : null}
			</div>
		</PageLayout>
	);
}
