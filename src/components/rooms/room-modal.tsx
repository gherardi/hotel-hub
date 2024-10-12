import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import {
	roomSchema,
	type roomSchemaType,
} from '@/components/rooms/room-schema';

type RoomModalProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function RoomModal({ open, setOpen }: RoomModalProps) {
	const { isCreating, createRoom } = useCreateRoom();

	const form = useForm<roomSchemaType>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			code: '',
			capacity: 1,
			price: 10,
			discount: 0,
		},
	});

	const onSubmit = function (values: roomSchemaType) {
		createRoom(values);
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
											disabled={isCreating}
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
											disabled={isCreating}
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
											disabled={isCreating}
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
											disabled={isCreating}
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
