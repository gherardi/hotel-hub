// import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { Mail } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

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
	AlertDialog,
	// AlertDialogAction,
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

const roomSchema = z.object({
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

export default function CreateRoomModal() {
	const { token } = useAuth();
	const form = useForm<z.infer<typeof roomSchema>>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			name: '005',
			price: 95,
			capacity: 2,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: z.infer<typeof roomSchema>) => {
			console.log('sending:', data);
			const response = await fetch(`${BASE_URL}/rooms`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			const resData = await response.json();
			if (resData.status !== 'success') throw new Error(resData.message);
			return resData;
		},
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error: Error) => {
			console.log('errore:', error.message);
		},
	});
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size='sm'>Nuova camera</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Crea nuova camera</AlertDialogTitle>
					<AlertDialogDescription>
						Inserisci i dettagli per la nuova camera.
					</AlertDialogDescription>
				</AlertDialogHeader>
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
											placeholder='00x'
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
							name='price'
							render={({ field }) => (
								<FormItem className='grid gap-2 space-y-0'>
									<FormLabel>Prezzo a notte in euro</FormLabel>
									<FormControl>
										<Input
											type='number'
											min={0}
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
							name='capacity'
							render={({ field }) => (
								<FormItem className='grid gap-2 space-y-0'>
									<FormLabel>Capacità</FormLabel>
									<FormControl>
										<Input
											type='number'
											min={1}
											disabled={isPending}
											{...field}
										/>
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
									'Crea camera'
								)}
							</Button>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
