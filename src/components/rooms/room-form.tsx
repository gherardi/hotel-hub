import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/database/supabase-client';
import { useRoomStore } from '@/stores/room-store';

const roomSchema = z
	.object({
		code: z.string().length(3),
		capacity: z.number().min(1).max(10),
		price: z.number().min(10),
		discount: z.number(),
	})
	.refine((data) => data.discount < data.price, {
		path: ['discount'],
		message: 'Lo sconto deve essere minore del prezzo',
	});

export function RoomForm({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { toast } = useToast();
	const updateRooms = useRoomStore((state) => state.updateRooms);

	const form = useForm<z.infer<typeof roomSchema>>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			code: '',
			capacity: 1,
			price: 10,
			discount: 0,
		},
	});

	const onSubmit = async function (values: z.infer<typeof roomSchema>) {
		const { data, error } = await supabase
			.from('rooms')
			.insert([
				{
					code: values.code,
					capacity: values.capacity,
					price: values.price,
					discount: values.discount,
				},
			])
			.select();

		if (error) {
			toast({
				variant: 'destructive',
				title: '',
				description: error.message || '',
			});
			return;
		}
		if (data) {
			toast({
				title: '',
				description: '',
			});
			updateRooms();
			form.reset();
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Aggiungi camera</DialogTitle>
							<DialogDescription>
								Inserisci le informazioni della nuova camera.
							</DialogDescription>
						</DialogHeader>

						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem className='grid items-center grid-cols-4 gap-x-4'>
									<FormLabel className='text-right'>Codice</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='001'
											className='col-span-3'
											disabled={form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<div></div>
									<FormMessage className='col-span-3' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='capacity'
							render={({ field }) => (
								<FormItem className='grid items-center grid-cols-4 gap-x-4'>
									<FormLabel className='text-right'>Capacità</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='10'
											className='col-span-3'
											disabled={form.formState.isSubmitting}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<div></div>
									<FormMessage className='col-span-3' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem className='grid items-center grid-cols-4 gap-x-4'>
									<FormLabel className='text-right'>Prezzo</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='10'
											className='col-span-3'
											disabled={form.formState.isSubmitting}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<div></div>
									<FormMessage className='col-span-3' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='discount'
							render={({ field }) => (
								<FormItem className='grid items-center grid-cols-4 gap-x-4'>
									<FormLabel className='text-right'>Sconto</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='10'
											className='col-span-3'
											disabled={form.formState.isSubmitting}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<div></div>
									<FormMessage className='col-span-3' />
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
