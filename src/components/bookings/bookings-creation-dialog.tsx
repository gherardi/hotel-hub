import { CalendarIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	bookingSchema,
	defaultValues,
	type BookingSchemaType,
} from '@/components/bookings/bookings-schema';
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
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useBookingStore } from '@/stores/booking-store';
import { useRoomStore } from '@/stores/room-store';
import { Input } from '@/components/ui/input';
import { supabase } from '@/database/supabase-client';
import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

type BookingsCreationDialogProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function BookingsCreationDialog({
	open,
	setOpen,
}: BookingsCreationDialogProps) {
	const { toast } = useToast();
	const rooms = useRoomStore((state) => state.rooms);
	const updateRooms = useRoomStore((state) => state.updateRooms);

	const updateBookings = useBookingStore((state) => state.updateBookings);

	const form = useForm<BookingSchemaType>({
		resolver: zodResolver(bookingSchema),
		defaultValues: defaultValues,
	});

	const onSubmit = async function (values: BookingSchemaType) {
		const room = rooms.find((room) => room.id === values.room_id)!;
		const roomPrice = room.price;
		const roomDiscount = room.discount;
		const roomCode = room.code;
		const bookingDays = Math.ceil(
			(values.check_out.getTime() - values.check_in.getTime()) /
				(1000 * 60 * 60 * 24)
		);
		const bookingPrice = (roomPrice - roomDiscount) * bookingDays;

		const { data, error } = await supabase
			.from('bookings')
			.insert([
				{
					customer_fullname: values.customer_fullname,
					check_in: values.check_in.toISOString(),
					check_out: values.check_out.toISOString(),
					room_price: roomPrice,
					room_discount: roomDiscount,
					room_id: values.room_id,
					booking_price: bookingPrice,
					notes: values.notes,
					room_code: roomCode,
				},
			])
			.select();

		if (error) {
			toast({
				variant: 'destructive',
				title: 'Errore di inserimento',
				description:
					error.message || "Errore durante l'inserimento della prenotazione",
			});
			return;
		}
		if (data) {
			toast({
				title: 'Prenotazione aggiunta',
				description: 'Prenotazione aggiunta con successo!',
			});
			updateBookings();
			form.reset();
			setOpen(false);
		}
	};

	useEffect(() => {
		updateRooms();
	}, []);

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
											disabled={form.formState.isSubmitting}
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
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'dd MMMM yyyy')
													) : (
														<span>Scegli una data</span>
													)}
													<CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date()}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
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
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'dd MMMM yyyy')
													) : (
														<span>Scegli una data</span>
													)}
													<CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date <= form.watch('check_in')}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
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
											{rooms.map((room) => (
												<SelectItem key={room.id} value={room.id}>
													n. {room.code} - {room.capacity} posti letto -{' '}
													{room.price - room.discount}€/notte
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{/* <FormDescription>
										Puoi aggiungere una camera nella pagina{' '}
										<Link to='/rooms'>camere</Link>.
									</FormDescription> */}
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
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
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
