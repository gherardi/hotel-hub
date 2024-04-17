import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { loginSchema } from '../utils/schemas.js';

import Label from '../components/ui/Label.jsx';
import Input from '../components/ui/Input.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import SubmitButton from '../components/ui/SubmitButton.jsx';

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
			if(!res.ok) throw new Error('Errore nella richiesta di login');
			const resData = await res.json();

			if (resData.status !== 'success')
				return setError('root', { message: data.message });

			return resData;
		},
		onSuccess: (data) => {
			document.cookie = `token=${data.token}`;
			localStorage.setItem('token', data.token);

			navigate('/dashboard', { replace: true, state: { from: '/' } });
		},
		onError: (error) => setError('root', { message: error.message }),
	});

	const onSubmit = function (data) {
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
							<Label htmlFor={'email'}>Email</Label>
							<div className='mt-2'>
								<Input
									reactHookFormRegister={register('email')}
									name='email'
									type='email'
									placeholder='email@example.com'
									isPending={isPending}
								/>
								<ErrorMessage>{errors.email?.message}</ErrorMessage>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<Label htmlFor={'password'}>Password</Label>
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
								<Input
									reactHookFormRegister={register('password')}
									name='password'
									type='password'
									placeholder='••••••••'
									isPending={isPending}
								/>
								<ErrorMessage>{errors.password?.message}</ErrorMessage>
							</div>
						</div>

						<div>
							<SubmitButton isPending={isPending}>Accedi</SubmitButton>
							<ErrorMessage>{errors.root?.message}</ErrorMessage>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
