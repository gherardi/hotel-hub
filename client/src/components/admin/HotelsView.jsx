import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../AuthProvider.jsx';
import FormDialog from '../ui/FormDialog.jsx';

import Label from '../ui/Label.jsx';
import Input from '../ui/Input.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

import { hotelSchema } from '../../utils/schemas.js';

export default function HotelsView() {
	const jwt = useAuth();
	const queryClient = useQueryClient();
	let [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(hotelSchema),
	});

	const {
		data: hotels,
		// isLoading,
		// isError,
		// error,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/hotels', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			if (!res.ok) throw new Error('Errore nella richiesta degli hotel');
			const { data } = await res.json();
			return data;
		},
		queryKey: ['hotels'],
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		reset();
	};

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/hotels', {
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
			queryClient.invalidateQueries(['hotels']);
			closeModal();
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const onSubmit = function (data) {
		mutate(data);
	};

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Hotel</h2>
				<button
					onClick={openModal}
					className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Crea hotel
				</button>

				<FormDialog
					dialogTitle={'Crea Hotel'}
					isOpen={isOpen}
					handleClose={closeModal}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<Label htmlFor={'name'}>Nome hotel</Label>
						<div className='mt-2'>
							<Input
								reactHookFormRegister={register('name')}
								name='name'
								type='text'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.name?.message}</ErrorMessage>
						</div>
					</div>

					<div>
						<SubmitButton isPending={isPending}>Aggiungi</SubmitButton>
						<ErrorMessage>{errors.root?.message}</ErrorMessage>
					</div>
				</FormDialog>
			</div>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500 '>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>tutto</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{hotels &&
							hotels.map((hotel) => {
								return (
									<tr key={hotel.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{hotel.name}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
