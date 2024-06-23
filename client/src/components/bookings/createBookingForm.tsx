import { SetStateAction, useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	AlertDialogCancel,
	AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useCreateBooking } from '@/hooks/useCreateBooking';
import { useFetchRooms } from '@/hooks/useFetchRooms';

export const bookingSchema = z.object({
	start_date: z.date().optional(),
	end_date: z.date().optional(),
	customer_fullname: z.string(),
	dates: z.string().optional(),
	room_id: z.string().optional(),
	observations: z.string().optional(),
	num_guests: z.string().optional(),
});

interface CreateBookingFormProps {
	setIsOpen: (isOpen: boolean) => void;
}

export default function CreateBookingForm({
	setIsOpen,
}: CreateBookingFormProps) {
	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: { customer_fullname: '' },
	});

	const { data: rooms } = useFetchRooms();

	const [date, setDate] = useState<DateRange>({
		from: new Date(),
		to: addDays(new Date(), 10),
	});

	const [room_id, setRoomId] = useState<string>('');

	const { mutate, isPending: isCreating, isSuccess } = useCreateBooking();
	if (isSuccess) setIsOpen(false);

	function onSubmit(data: z.infer<typeof bookingSchema>) {
		mutate({
			customer_fullname: data.customer_fullname,
			start_date: date.from,
			end_date: date.to,
			room_id: room_id,
			num_guests: '1',
			observations: data.observations,
		});
	}

	useEffect(() => {
		const calcTotalPrice = async () => {
			if (!date.from || !date.to || !room_id) return;

			const nights = Math.floor(
				(date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
			);
			const room = rooms?.find((room) => room.id === room_id);
			if (!room) return 0;
			const total = nights * room.price;
			setTotalPrice(total);
		};
		calcTotalPrice();
	}, [date, room_id, rooms]);

	const [totalPrice, setTotalPrice] = useState(0);

	return (
		<Form {...form}>
			<form
				className='grid gap-4'
				onSubmit={form.handleSubmit((data) => onSubmit(data))}
			>
				<FormField
					control={form.control}
					name='customer_fullname'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Nominativo cliente</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='Mario Rossi'
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
					name='dates'
					render={() => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Data prenotazione</FormLabel>
							<FormControl>
								<div className='grid gap-2 w-full'>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												id='date'
												variant={'outline'}
												className={cn(
													'justify-start text-left font-normal',
													!date && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{date?.from ? (
													date.to ? (
														<>
															{format(date.from, 'LLL dd, y')} -{' '}
															{format(date.to, 'LLL dd, y')}
														</>
													) : (
														format(date.from, 'LLL dd, y')
													)
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												initialFocus
												mode='range'
												defaultMonth={date?.from}
												selected={date}
												onSelect={(e)=> setDate(e as SetStateAction<DateRange>)}
												numberOfMonths={2}
												disabled={isCreating}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='room_id'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Camera</FormLabel>
							<FormControl>
								<Select
									disabled={isCreating}
									{...field}
									onValueChange={(e) => setRoomId(e)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Seleziona una camera' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Seleziona una camera</SelectLabel>
											{rooms?.map((room) => (
												<SelectItem key={room.id} value={room.id}>
													{room.name} - {room.price}€/notte
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='observations'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Note</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder='Type your message here.' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='text-xl font-semibold text-right'>
					Totale: {totalPrice}€
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel>Annulla</AlertDialogCancel>
					<Button type='submit' disabled={isCreating}>
						{isCreating ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Accesso in corso
							</>
						) : (
							'Crea prenotazione'
						)}
					</Button>
				</AlertDialogFooter>
			</form>
		</Form>
	);
}
