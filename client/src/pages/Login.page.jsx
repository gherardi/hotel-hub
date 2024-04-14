import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { loginSchema } from '../utils/schemas.js';

export default function LoginPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await fetch('http://localhost:3000/api/auth/login', {
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

			document.cookie = `jwt=${data.token}`;
			localStorage.setItem('jwt', data.token);

			navigate('/dashboard', { replace: true, state: { from: '/' } });
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const onSubmit = async function (data) {
		mutate(data);
	};

	return (
		<>
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='text-2xl font-bold leading-9 tracking-tight'>
						Accedi al tuo account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6 '
							>
								Email
							</label>
							<div className='mt-2'>
								<input
									{...register('email')}
									id='email'
									name='email'
									type='email'
									placeholder='email@example.com'
									disabled={isPending}
									className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								/>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.email?.message}
								</div>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 '
								>
									Password
								</label>
								<div className='text-sm'>
									<Link
										to='/forgot-password'
										className='font-semibold text-indigo-600 hover:text-indigo-500'
									>
										Password dimenticata?
									</Link>
								</div>
							</div>
							<div className='mt-2'>
								<input
									{...register('password')}
									id='password'
									name='password'
									type='password'
									placeholder='••••••••'
									disabled={isPending}
									className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								/>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.password?.message}
								</div>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={isPending}
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								{isPending ? 'Loading...' : 'Accedi'}
							</button>
							<div className='h-4 mt-1 text-xs font-medium text-red-400'>
								{errors.root?.message}
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
