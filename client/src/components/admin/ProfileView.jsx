import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../AuthProvider.jsx';

import Label from '../ui/Label.jsx';
import Input from '../ui/Input.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

import { updateSchema } from '../../utils/schemas.js';

export default function ProfileView() {
	const jwt = useAuth();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(updateSchema),
	});

	// FETCHING DEFAULT VALUES
	const {
		data: user,
		// isError,
		// error,
		isFetching,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/users/me', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await res.json();
			for (const key in data) {
				const value = data[key];
				setValue(key, value);
			}
			console.log(data);
			return data;
		},
		queryKey: ['user'],
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/users/me', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Errore nel cambio delle credenziali dell'utente");

			const resData = await res.json();

			if (resData.status !== 'success') throw new Error(resData.message);

			return resData;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const onSubmit = function (data) {
		console.log('DATI MANDATI MUTATION:', data);
		mutate(data);
	};

	const isDisabled = isPending || isFetching;

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Profilo</h2>
			</div>
			<div>
				<div className='max-w-md'>
					<form className='space-y-2.5' onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div>
								<Label htmlFor={'first_name'}>Nome</Label>
								<Input
									reactHookFormRegister={register('first_name', {
										value: user ? user.first_name : 'Caricamento...',
									})}
									name='first_name'
									type='text'
									isPending={isDisabled}
								/>
								<ErrorMessage>{errors.first_name?.message}</ErrorMessage>
							</div>

							<div>
								<Label htmlFor={'last_name'}>Cognome</Label>
								<Input
									reactHookFormRegister={register('last_name', {
										value: user ? user.last_name : 'Caricamento...',
									})}
									name='last_name'
									type='text'
									isPending={isDisabled}
								/>
								<ErrorMessage>{errors.last_name?.message}</ErrorMessage>
							</div>
						</div>

						<div>
							<Label htmlFor={'email'}>Email</Label>
							<Input
								reactHookFormRegister={register('email', {
									value: user ? user.email : 'Caricamento...',
								})}
								name='email'
								type='text'
								isPending={isDisabled}
							/>
							<ErrorMessage>{errors.email?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor={'hotel_id'}>Hotel associato</Label>
							<Input
								reactHookFormRegister={register('hotel_id', {
									value: user ? user.hotel_id : 'Caricamento...',
								})}
								name='hotel_id'
								type='text'
								isPending={true}
							/>
							<ErrorMessage>{errors.hotel_id?.message}</ErrorMessage>
						</div>

						<div>
							<SubmitButton isPending={isDisabled}>Aggiorna</SubmitButton>
							<ErrorMessage>{errors.root?.message}</ErrorMessage>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
