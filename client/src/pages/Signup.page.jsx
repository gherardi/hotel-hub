import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueries } from '@tanstack/react-query';

import Label from '../components/ui/Label.jsx';
import Input from '../components/ui/Input.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import SubmitButton from '../components/ui/SubmitButton.jsx';

import { signupSchema } from '../utils/schemas.js';

export default function SignupPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const [hotels] = useQueries({
		queries: [
			{
				queryKey: ['hotels'],
				queryFn: async () => {
					const res = await fetch('http://localhost:3000/api/hotels');
					const { data } = await res.json();
					return data;
				},
			},
		],
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const resData = await res.json();

			return resData;
		},
		onSuccess: (data) => {
			if (data.status !== 'success')
				return setError('root', { message: data.message });

			document.cookie = `token=${data.token}`;
			localStorage.setItem('token', data.token);

			navigate('/dashboard', { replace: true, state: { from: '/' } });
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	return (
		<>
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='text-2xl font-bold leading-9 tracking-tight'>
						Registrazione
					</h2>
				</div>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
					<form className='space-y-2.5' onSubmit={handleSubmit(mutate)}>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div>
								<Label htmlFor='first_name'>Nome</Label>
								<Input
									reactHookFormRegister={register('first_name')}
									name='first_name'
									type='text'
									isPending={isPending}
								/>
								<ErrorMessage>{errors.first_name?.message}</ErrorMessage>
							</div>

							<div>
								<Label htmlFor='last_name'>Cognome</Label>
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
							<Label htmlFor='email'>Email</Label>
							<Input
								reactHookFormRegister={register('email')}
								name='email'
								type='text'
								isPending={isPending}
								placeholder='email@example.com'
							/>
							<ErrorMessage>{errors.email?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor='password'>Password</Label>
							<Input
								reactHookFormRegister={register('password')}
								name='password'
								type='password'
								isPending={isPending}
								placeholder='••••••••'
							/>
							<ErrorMessage>{errors.password?.message}</ErrorMessage>
						</div>

						<div>
							<Label htmlFor='hotel_id'>Hotel associato</Label>

							<select
								{...register('hotel_id')}
								id='hotel_id'
								name='hotel_id'
								disabled={isPending}
								className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
							>
								<option value=''>
									{hotels.isFetching ? 'Caricamento...' : 'Scegli un hotel'}
								</option>
								{hotels.data?.map((hotel) => (
									<option key={hotel.id} value={hotel.id}>
										{hotel.name}
									</option>
								))}
							</select>
							<ErrorMessage>{errors.hotel_id?.message}</ErrorMessage>
						</div>

						<div>
							<SubmitButton isPending={isPending}>Registrati</SubmitButton>
							<ErrorMessage>{errors.root?.message}</ErrorMessage>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
