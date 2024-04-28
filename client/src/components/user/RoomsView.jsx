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

import { roomSchema, capacityAlias } from '../../utils/schemas.js';

export default function RoomsView() {
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
		resolver: zodResolver(roomSchema),
	});

	const [rooms] = useQueries({
		queries: [
			{
				queryKey: ['rooms'],
				queryFn: fetchData('http://localhost:3000/api/rooms'),
			},
		],
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/rooms', {
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
		mutate(data);
	};

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Camere</h2>
				<button
					onClick={openModal}
					className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Crea camera
				</button>
				<FormDialog
					dialogTitle={'Crea camera'}
					isOpen={isOpen}
					handleClose={closeModal}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<Label htmlFor={'capacity'}>Capacità</Label>
						<select
							{...register('capacity')}
							id='capacity'
							name='capacity'
							disabled={isPending}
							className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
						>
							<option value=''>Scegli la capacità</option>
							<option value='Single'>Singola</option>
							<option value='Double'>Doppia</option>
							<option value='Triple'>Tripla</option>
							<option value='Quadruple'>Quadrupla</option>
						</select>
						<ErrorMessage>{errors.capacity?.message}</ErrorMessage>
					</div>

					<div>
						<Label htmlFor={'price'}>Prezzo a notte</Label>
						<Input
							reactHookFormRegister={register('price')}
							name='price'
							type='number'
							isPending={isPending}
						/>
						<ErrorMessage>{errors.price?.message}</ErrorMessage>
					</div>

					<div>
						<Label htmlFor={'number'}>Numero della camera</Label>
						<Input
							reactHookFormRegister={register('number')}
							name='number'
							type='number'
							isPending={isPending}
						/>
						<ErrorMessage>{errors.number?.message}</ErrorMessage>
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
						<tr className='[&>*]:px-6 [&>*]:py-3 [&>*]:text-nowrap'>
							<th scope='col'>Capacità</th>
							<th scope='col'>prezzo a notte</th>
							<th scope='col'>Numero</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody className='divide-y-2'>
						{rooms && rooms.data?.length !== 0 ? (
							rooms.data?.map((room) => {
								return (
									<tr
										key={room.id}
										className='[&>*]:px-6 [&>*]:py-4 [&>*]:text-nowrap'
									>
										<td>{capacityAlias[room.capacity]}</td>
										<td>{room.price}€</td>
										<td>{room.number}</td>
										<td>action...</td>
									</tr>
								);
							})
						) : (
							<tr className='[&>*]:px-6 [&>*]:py-4'>
								<td>Nessuna camera registrato</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
