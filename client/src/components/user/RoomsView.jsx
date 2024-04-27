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

import { roomSchema } from '../../utils/schemas.js';

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

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		reset();
	};

	const onSubmit = function (data) {
		console.log(data);
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
						<Label htmlFor={'email'}>Email</Label>
						<Input
							reactHookFormRegister={register('email')}
							name='email'
							type='text'
							// isPending={isPending}
						/>
						<ErrorMessage>{errors.email?.message}</ErrorMessage>
					</div>

					<div>
						<Label htmlFor={'hotel_id'}>Hotel associato</Label>
						<select
							{...register('hotel_id')}
							id='hotel_id'
							name='hotel_id'
							// disabled={isPending}
							className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
						>
							<option value=''>
								{/* {isFetching ? 'Caricamento hotel...' : 'Scegli un hotel'} */}
							</option>
							{/* {hotels &&
								hotels.map((hotel) => (
									<option key={hotel.id} value={hotel.id}>
										{hotel.name}
									</option>
								))} */}
						</select>
						<ErrorMessage>{errors.hotel_id?.message}</ErrorMessage>
					</div>

					<div>
						<SubmitButton isPending={false}>Aggiungi</SubmitButton>
						<ErrorMessage>{errors.root?.message}</ErrorMessage>
					</div>
				</FormDialog>
			</div>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Numero</th>
							<th scope='col'>Tipo</th>
							{/* <th scope='col'>Created at</th>
							<th scope='col'>prezzo a notte</th>
							<th scope='col'>numero</th>
							<th scope='col'>hotel</th>
							<th scope='col'>Elimina</th> */}
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody className='divide-y-2'></tbody>
					{/* <tbody className='divide-y-2 empty:hidden'>
						{rooms &&
							rooms.map((room) => {
								return (
									<tr key={room.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{new Date(room.created_at).toLocaleString()}</td>
										<td>{room.type}</td>
										<td>{room.price}€</td>
										<td>{room.number}</td>
										<td>{room.hotel.name}</td>
										<td>
											<button
												type='button'
												className='px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200'
												onClick={async () => {
													const resp = await fetch(
														`http://localhost:3000/api/camere/${room.id}`,
														{
															method: 'DELETE',
															headers: {
																Authorization: `Bearer ${jwt}`,
															},
														}
													);
													const data = await resp.json();
													if (data.status === 'success') {
														setRooms((prev) =>
															prev.filter((u) => u.id !== room.id)
														);
													}
												}}
											>
												<Trash2 size={16} />
											</button>
										</td>
									</tr>
								);
							})}
					</tbody> */}
				</table>
			</div>
		</>
	);
}
