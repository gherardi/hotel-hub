import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import validator from 'validator';
import { useAuth } from '../components/AuthProvider.jsx';

const schema = z.object({
	name: z.string().refine((value) => !!value, {
		message: 'Please provide your name!',
	}),
	email: z
		.string()
		.refine((value) => !!value, {
			message: 'Please provide your email!',
		})
		.refine((value) => validator.isEmail(value), {
			message: 'Please provide a valid email!',
		}),

	password: z
		.string()
		.min(8, {
			message: 'Password must be at least 8 characters long!',
		})
		.refine(
			(value) =>
				validator.isStrongPassword(value, {
					minUppercase: 0,
					minNumbers: 0,
					minLength: 8,
					minSymbols: 1,
				}),
			{
				message: 'Password should contains at leats one symbol',
			}
		),
});

export default function ProfilePage() {
	const [success, setSuccess] = useState(false);
	const jwt = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async function (data) {
		try {
			console.log('submitted data:', data);

			const res = await fetch('http://localhost:3000/api/albergatori/updateMe', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(data),
			});
			const resp = await res.json();
			console.log(resp);
			if (resp.status === 'success') {
				setSuccess(true);
			}
		} catch (err) {
			if (err.code === 'ERR_NETWORK') {
				setError('root', {
					message: 'Failed to connect to the server, try again later!',
				});
				return;
			}
			setError('root', {
				message: err.response.data.message,
			});
		}
	};

	return (
		<>
			<h2>Profile</h2>
			<form
				className='sm:w-1/2 lg:w-1/3'
				onSubmit={handleSubmit(onSubmit)}
				onChange={() => setSuccess(false)}
			>
				<div className='space-y-4'>
					<div>
						<label htmlFor='name' className='block text-sm font-semibold leading-6 text-gray-900'>
							Full name
						</label>
						<div className='mt-2'>
							<input
								{...register('name')}
								type='text'
								name='name'
								id='name'
								placeholder='John Doe'
								autoComplete='name'
								disabled={isSubmitting}
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							<div className='h-4 mt-1 text-xs font-medium text-red-400'>
								{errors.name?.message}
							</div>
						</div>
					</div>

					<div>
						<label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
							Email
						</label>
						<div className='mt-2'>
							<input
								{...register('email')}
								type='email'
								name='email'
								id='email'
								placeholder='email@example.com'
								autoComplete='email'
								disabled={isSubmitting}
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							<div className='h-4 mt-1 text-xs font-medium text-red-400'>
								{errors.email?.message}
							</div>
						</div>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-semibold leading-6 text-gray-900'
						>
							Password
						</label>
						<div className='mt-2'>
							<input
								{...register('password')}
								type='password'
								name='password'
								id='password'
								autoComplete='off'
								placeholder='********'
								disabled={isSubmitting}
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
							<div className='h-4 mt-1 text-xs font-medium text-red-400'>
								{errors.password?.message}
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6'>
					<button
						type='submit'
						className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Update profile
					</button>
					<div className='h-4 mt-1 text-sm font-medium text-green-400'>
						{success ? 'credenziali cambiate correttamente' : null}
					</div>
				</div>
			</form>
		</>
	);
}
