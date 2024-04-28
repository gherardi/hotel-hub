import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../AuthProvider.jsx';

import FormDialog from '../ui/FormDialog.jsx';
import Label from '../ui/Label.jsx';
import Input from '../ui/Input.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

import fetchData from '../../utils/api.js';

import { bookingSchema } from '../../utils/schemas.js';

export default function BookingsPage() {
	const [isOpen, setIsOpen] = useState(false);
	const jwt = useAuth();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		// resolver: zodResolver(bookingSchema),
	});

	const [bookings, rooms] = useQueries({
		queries: [
			{
				queryKey: ['bookings'],
				queryFn: fetchData('http://localhost:3000/api/bookings'),
			},
			{
				queryKey: ['rooms'],
				queryFn: fetchData('http://localhost:3000/api/rooms'),
			},
		],
	});

	if (bookings.data)
		bookings.data.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Errore nella creazione dell'hotel");

			const resData = await res.json();

			if (resData.status !== 'success') throw new Error(resData.message);

			return resData;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['rooms']);
			closeModal();
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		reset();
	};

	const onSubmit = function (data) {
		console.log('RECEIVED DATA: ', data);
		// mutate(data);
	};

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Prenotazioni</h2>
				<button
					onClick={openModal}
					className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Crea prenotazione
				</button>
				<FormDialog
					dialogTitle={'Crea prenotazione'}
					isOpen={isOpen}
					handleClose={closeModal}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<Label htmlFor={'customer_first_name'}>Nome Cliente</Label>
							<Input
								reactHookFormRegister={register('customer_first_name')}
								name='customer_first_name'
								type='text'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.customer_first_name?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor={'customer_last_name'}>Cognome Cliente</Label>
							<Input
								reactHookFormRegister={register('customer_last_name')}
								name='customer_last_name'
								type='text'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.customer_last_name?.message}</ErrorMessage>
						</div>
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<Label htmlFor={'start_date'}>Data arrivo</Label>
							<Input
								reactHookFormRegister={register('start_date')}
								name='start_date'
								type='date'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.start_date?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor={'end_date'}>Data partenza</Label>
							<Input
								reactHookFormRegister={register('end_date')}
								name='end_date'
								type='date'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.end_date?.message}</ErrorMessage>
						</div>
					</div>

					<div>
						<Label htmlFor={'room_id'}>Camera</Label>
						<select
							{...register('room_id')}
							id='room_id'
							name='room_id'
							disabled={isPending}
							className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
						>
							<option value=''>
								{rooms.isFetching ? 'Caricamento...' : 'Scegli la capacità'}
							</option>
							{rooms.data &&
								rooms.data.map((room) => (
									<option key={room.id} value={room.id}>
										{room.number} - {room.capacity}
									</option>
								))}
							{/* <option value='Single'>Singola</option>
							<option value='Double'>Doppia</option>
							<option value='Triple'>Tripla</option>
							<option value='Quadruple'>Quadrupla</option> */}
						</select>
						<ErrorMessage>{errors.room_id?.message}</ErrorMessage>
					</div>

					<div>
						<SubmitButton isPending={isPending}>Aggiungi</SubmitButton>
						<ErrorMessage>{errors.root?.message}</ErrorMessage>
					</div>
				</FormDialog>
			</div>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Nominativo</th>
							<th scope='col'>Created at</th>
							<th scope='col'>arrivo</th>
							<th scope='col'>partenza</th>
							<th scope='col'>notti</th>
							<th scope='col'>totale</th>
							<th scope='col'>n. camera</th>
							<th scope='col'>Elimina</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						<tr className='[&>*]:px-6 [&>*]:py-4'>
							<td>bookings</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
