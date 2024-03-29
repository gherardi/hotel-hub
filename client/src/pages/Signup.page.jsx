import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import validator from 'validator';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import { useEffect } from 'react';
import { useState } from 'react';

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
	hotel_id: z.string().refine((value) => !!value, {
		message: 'Please select an hotel!',
	}),
});

export default function SignupPage() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const { setItem } = useLocalStorage('token');

	const navigate = useNavigate();

	const onSubmit = async function (data) {
		try {
			const res = await axios.post('http://localhost:3000/api/auth/signup', data);

			const { token } = res.data;

			setItem(token);
			document.cookie = `jwt=${token}`;

			navigate('/dashboard', { replace: true, state: { from: '/' } });
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

	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		const getHotels = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/auth/hotels');
				const { data } = await res.json();
				setHotels(data);
			} catch (err) {
				setError('root', {
					message: 'Failed to fetch hotels from the server, try again later!',
				});
			}
		};
		getHotels();
	}, [setError]);

	return (
		<>
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='text-2xl font-bold leading-9 tracking-tight text-center text-'>
						Sign up to our service
					</h2>
				</div>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label htmlFor='name' className='block text-sm font-medium leading-6'>
								Full name
							</label>
							<div className='mt-2'>
								<input
									{...register('name')}
									id='name'
									name='name'
									type='text'
									autoComplete='name'
									placeholder='John Doe'
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								/>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.name?.message}
								</div>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium leading-6'>
								Email address
							</label>
							<div className='mt-2'>
								<input
									{...register('email')}
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									placeholder='email@example.com'
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								/>
								{/* disabled:opacity-60 - guardare video degli input su tailwindlabs YT */}
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.email?.message}
								</div>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6'
								>
									Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									{...register('password')}
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									placeholder='••••••••'
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								/>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.password?.message}
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor='hotel_id'
								className='block text-sm font-medium leading-6'
							>
								Hotel
							</label>
							<div className='mt-2'>
								<select
									{...register('hotel_id')}
									id='hotel_id'
									name='hotel_id'
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								>
									<option value=''>Choose an option</option>
									{hotels.map((hotel) => (
										<option key={hotel.id} value={hotel.id}>
											{hotel.name}
										</option>
									))}
								</select>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.hotel_id?.message}
								</div>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-background shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
							>
								{isSubmitting ? 'Loading...' : 'Sign up'}
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
