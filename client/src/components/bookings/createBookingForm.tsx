import { useState } from 'react';
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
import {
	AlertDialogCancel,
	AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useCreateBooking } from '@/hooks/useCreateBooking';

export const bookingSchema = z.object({
	customer_fullname: z.string(),
	dates: z.object({
		from: z.string(),
		to: z.string(),
	}),
	num_guests: z.string(),
});

interface CreateBookingFormProps {
	setIsOpen: (isOpen: boolean) => void;
}

export default function CreateBookingForm({
	setIsOpen,
}: CreateBookingFormProps) {
	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		// defaultValues: { name: '', price: 0, capacity: 0 },
	});

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	const { mutate, isPending: isCreating, isSuccess } = useCreateBooking();
	if (isSuccess) setIsOpen(false);

	function onSubmit(data: z.infer<typeof bookingSchema>) {
		console.log(data);
		// mutate(data);
	}

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
					name='num_guests'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Numeri ospiti</FormLabel>
							<FormControl>
								<Input type='number' disabled={isCreating} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
