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

import { signupSchema } from '../../utils/schemas.js';

export default function UsersView() {
	const [isOpen, setIsOpen] = useState(false);
	const jwt = useAuth();
	const queryClient = useQueryClient();

	// FETCHING USERS FOR TABLE
	const {
		data: users,
		// isError,
		// error,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/users', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await res.json();
			return data;
		},
		queryKey: ['users'],
	});

	// 	FETCHING HOTELS FOR MODAL REGISTRATION
	const {
		data: hotels,
		// isError,
		// error,
		isFetching,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/hotels', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await res.json();
			return data;
		},
		queryKey: ['hotels'],
	});

	// REACT HOOK FORM FOR MODAL
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		reset();
	};

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Errore nella creazione dell'utente");

			const resData = await res.json();

			if (resData.status !== 'success') throw new Error(resData.message);

			return resData;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			closeModal();
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const onSubmit = function (data) {
		console.log('DATI MANDATI MUTATION:', data);
		mutate(data);
	};

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Utenti</h2>
				<button
					onClick={openModal}
					className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Crea utente
				</button>
				<FormDialog
					dialogTitle={'Crea utente'}
					isOpen={isOpen}
					handleClose={closeModal}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<Label htmlFor={'first_name'}>Nome</Label>
							<Input
								reactHookFormRegister={register('first_name')}
								name='first_name'
								type='text'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.first_name?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor={'last_name'}>Cognome</Label>
							<Input
								reactHookFormRegister={register('last_name')}
								name='last_name'
								type='text'
								isPending={isPending}
							/>
							<ErrorMessage>{errors.last_name?.message}</ErrorMessage>
						</div>
					</div>

					<div>
						<Label htmlFor={'email'}>Email</Label>
						<Input
							reactHookFormRegister={register('email')}
							name='email'
							type='text'
							isPending={isPending}
						/>
						<ErrorMessage>{errors.email?.message}</ErrorMessage>
					</div>

					<div>
						<Label htmlFor={'password'}>Password</Label>
						<Input
							reactHookFormRegister={register('password')}
							name='password'
							type='password'
							isPending={isPending}
						/>
						<ErrorMessage>{errors.password?.message}</ErrorMessage>
					</div>

					<div>
						<Label htmlFor={'hotel_id'}>Hotel associato</Label>
						<select
							{...register('hotel_id')}
							id='hotel_id'
							name='hotel_id'
							disabled={isPending}
							className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
						>
							<option value=''>
								{isFetching ? 'Caricamento hotel...' : 'Scegli un hotel'}
							</option>
							{hotels &&
								hotels.map((hotel) => (
									<option key={hotel.id} value={hotel.id}>
										{hotel.name}
									</option>
								))}
						</select>
						<ErrorMessage>{errors.hotel_id?.message}</ErrorMessage>
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
							<th scope='col'>Creazione</th>
							<th scope='col'>Nominativo</th>
							<th scope='col'>Indirizzo email</th>
							<th scope='col'>Hotel associato</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody className='divide-y-2'>
						{users && users.length !== 0 ? (
							users.map((user) => {
								return (
									<tr
										key={user.id}
										className='[&>*]:px-6 [&>*]:py-4 [&>*]:text-nowrap'
									>
										<td>{new Date(user.created_at).toLocaleString()}</td>
										<td>
											{user.first_name} {user.last_name}
										</td>
										<td>{user.email}</td>
										<td>
											{user.hotel_id
												? user.hotels.name
												: 'Nessun hotel associato'}
										</td>
										<td>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='16'
												height='16'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
												className='lucide lucide-ellipsis-vertical'
											>
												<circle cx='12' cy='12' r='1' />
												<circle cx='12' cy='5' r='1' />
												<circle cx='12' cy='19' r='1' />
											</svg>
										</td>
									</tr>
								);
							})
						) : (
							<tr className='[&>*]:px-6 [&>*]:py-4'>
								<td>Nessun utente registrato</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
