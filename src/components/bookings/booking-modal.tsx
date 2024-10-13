import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
	bookingSchema,
	defaultValues,
	type BookingSchemaType,
} from '@/components/bookings/booking-schema';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { useRooms } from '@/hooks/useRooms';
import { useCreateBooking } from '@/hooks/useCreateBooking';

type BookingModalProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function BookingModal({ open, setOpen }: BookingModalProps) {
	const { isCreating, createBooking } = useCreateBooking();
	const { rooms } = useRooms();

	const form = useForm<BookingSchemaType>({
		resolver: zodResolver(bookingSchema),
		defaultValues: defaultValues,
	});

	const onSubmit = async function (values: BookingSchemaType) {
		const check_in_date = new Date(values.check_in);
		const check_out_date = new Date(values.check_out);
		const room = rooms?.find((room) => room.id === values.room_id)!;
		const roomPrice = room.price;
		const roomDiscount = room.discount;
		const roomCode = room.code;
		const bookingDays = Math.ceil(
			(check_out_date.getTime() - check_in_date.getTime()) /
				(1000 * 60 * 60 * 24)
		);
		const bookingPrice = (roomPrice - roomDiscount) * bookingDays;
		createBooking(
			{
				customer_fullname: values.customer_fullname,
				check_in: check_in_date.toISOString(),
				check_out: check_out_date.toISOString(),
				room_price: roomPrice,
				room_discount: roomDiscount,
				room_id: values.room_id,
				booking_price: bookingPrice,
				notes: values.notes,
				room_code: roomCode,
			},
			{
				onSettled: () => {
					form.reset();
					setOpen(false);
				},
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<DialogHeader>
							<DialogTitle>Aggiungi prenotazione</DialogTitle>
							<DialogDescription>
								Inserisci le informazioni della prenotazione.
							</DialogDescription>
						</DialogHeader>

						<FormField
							control={form.control}
							name='customer_fullname'
							render={({ field }) => (
								<FormItem className='grid gap-2 space-y-0'>
									<FormLabel>Nome e cognome del cliente</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='John Doe'
											disabled={isCreating}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='check_in'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Data di check-in</FormLabel>
									<FormControl>
										<Input
											type='date'
											placeholder='Scegli una data'
											disabled={isCreating}
											min={new Date().toISOString().split('T')[0]}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='check_out'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Data di check-out</FormLabel>
									<FormControl>
										<Input
											type='date'
											placeholder='Scegli una data'
											disabled={isCreating}
											// min={new Date().toISOString().split('T')[0]}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='room_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Numero di camera</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Seleziona una camera' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{rooms?.map((room) => (
												<SelectItem key={room.id} value={room.id}>
													n. {room.code} - {room.capacity} posti letto -{' '}
													{room.price - room.discount}€/notte
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='notes'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Note sulla prenotazione'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type='submit'
								className='flex items-center mt-2'
								disabled={isCreating}
							>
								{isCreating ? (
									<>
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />{' '}
										Caricamento...
									</>
								) : (
									'Aggiungi'
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
