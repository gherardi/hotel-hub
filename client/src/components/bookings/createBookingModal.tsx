import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { DateRange } from 'react-day-picker';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { BASE_URL } from '@/config';
import { useAuth } from '../auth-provider';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';

const bookingSchema = z.object({
	customer_fullname: z.string(),
	dates: z.object(),

	// status: z.enum(['UNCONFIRMED', 'CONFIRMED', 'CANCELLED']).default('UNCONFIRMED'), // Text with default value
	// observations: z.string().nullable(), // Nullable text
	// isPaid: z.boolean().default(false), // Boolean with default value
	num_guests: z.string(), // Numeric
	// num_nights: z.number(), // Numeric
	// room_price: z.number(), // Numeric
	// total_price: z.number(), // Numeric
});

export default function CreateBookingModal() {
	const queryClient = useQueryClient();
	const { token } = useAuth();

	const [isOpen, setIsOpen] = useState(false);

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		// defaultValues: { name: '', price: 0, capacity: 0 },
	});

	// const { mutate, isPending } = useMutation({
	// 	mutationFn: async (data: z.infer<typeof bookingSchema>) => {
	// 		console.log('sending:', data);
	// 		const response = await fetch(`${BASE_URL}/bookings`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify(data),
	// 		});
	// 		const resData = await response.json();
	// 		if (resData.status !== 'success') throw new Error(resData.message);
	// 		return resData;
	// 	},
	// 	onSuccess: (data) => {
	// 		console.log(data);
	// 		queryClient.invalidateQueries({ queryKey: ['bookings'] });
	// 		setIsOpen(false);
	// 	},
	// 	onError: (error: Error) => {
	// 		console.log('errore:', error.message);
	// 	},
	// });

	const onSubmit = (data: z.infer<typeof bookingSchema>) => {
		console.log(data);
	};

	const isPending = false;

	return (
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
											disabled={isPending}
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
							render={({ field }) => (
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
														onSelect={setDate}
														numberOfMonths={2}
														disabled={isPending}
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
							name='num_guests'
							render={({ field }) => (
								<FormItem className='grid gap-2 space-y-0'>
									<FormLabel>Numeri ospiti</FormLabel>
									<FormControl>
										<Input type='number' disabled={isPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<AlertDialogFooter>
							<AlertDialogCancel>Annulla</AlertDialogCancel>
							<Button type='submit' disabled={isPending}>
								{isPending ? (
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
			</AlertDialogContent>
		</AlertDialog>
	);
}
