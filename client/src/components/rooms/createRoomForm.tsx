import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateRoom } from '@/hooks/useCreateRoom';
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

export const roomSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Il nome deve essere di almeno 3 caratteri' })
		.max(3, { message: 'Il nome deve essere di al massimo 3 caratteri' }),
	price: z
		.string()
		.transform((val) => parseFloat(val))
		.refine((val) => !isNaN(val), {
			message: 'Il prezzo deve essere un numero',
		}),
	capacity: z
		.string()
		.transform((val) => parseInt(val, 10))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'La capacità deve essere un numero intero positivo',
		}),
});

interface CreateRoomFormProps {
	setIsOpen: (isOpen: boolean) => void;
}

export default function CreateRoomForm({ setIsOpen }: CreateRoomFormProps) {
	const form = useForm<z.infer<typeof roomSchema>>({
		resolver: zodResolver(roomSchema),
		defaultValues: { name: '', price: 0, capacity: 0 },
	});

	const { mutate, isPending: isCreating, isSuccess } = useCreateRoom();

  if(isSuccess) setIsOpen(false);

	return (
		<Form {...form}>
			<form
				className='grid gap-4'
				onSubmit={form.handleSubmit((data) => mutate(data))}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Numero</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='es. 101, 102, 103, ecc.'
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
					name='price'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Prezzo a notte in euro</FormLabel>
							<FormControl>
								<Input type='number' disabled={isCreating} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='capacity'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Capacità</FormLabel>
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
							'Crea camera'
						)}
					</Button>
				</AlertDialogFooter>
			</form>
		</Form>
	);
}
