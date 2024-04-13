import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import useLocalStorage from '../hooks/useLocalStorage.jsx';

import { signupSchema } from '../utils/schemas.js';

export default function SignupPage() {
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	// const { setItem } = useLocalStorage('token');

	// const navigate = useNavigate();

	const onSubmit = async function (data) {
		console.log('RECEIVED DATA: ', data);
		// 	try {
		// 		const res = await axios.post(
		// 			'http://localhost:3000/api/auth/signup',
		// 			data
		// 		);
		// 		const { token } = res.data;
		// 		setItem(token);
		// 		document.cookie = `jwt=${token}`;
		// 		navigate('/dashboard', { replace: true, state: { from: '/' } });
		// 	} catch (err) {
		// 		if (err.code === 'ERR_NETWORK') {
		// 			setError('root', {
		// 				message: 'Failed to connect to the server, try again later!',
		// 			});
		// 			return;
		// 		}
		// 		setError('root', {
		// 			message: err.response.data.message,
		// 		});
		// 	}
	};

	// const [hotels, setHotels] = useState([]);
	const [hotels] = useState([]);

	// useEffect(() => {
	// 	const getHotels = async () => {
	// 		try {
	// 			const res = await fetch('http://localhost:3000/api/auth/hotels');
	// 			const { data } = await res.json();
	// 			setHotels(data);
	// 		} catch (err) {
	// 			setError('root', {
	// 				message: 'Failed to fetch hotels from the server, try again later!',
	// 			});
	// 		}
	// 	};
	// 	getHotels();
	// }, [setError]);

	return (
		<>
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='text-2xl font-bold leading-9 tracking-tight'>
						Registrazione
					</h2>
				</div>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='first_name'
									className='block text-sm font-medium leading-6'
								>
									Nome
								</label>
								<div className='mt-2'>
									<input
										{...register('first_name')}
										type='text'
										name='first_name'
										id='first_name'
										placeholder='John Doe'
										autoComplete='given-name'
										disabled={isSubmitting}
										className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
									/>
									<div className='h-4 mt-1 text-xs font-medium text-red-400'>
										{errors.first_name?.message}
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor='last_name'
									className='block text-sm font-medium leading-6'
								>
									Cognome
								</label>
								<div className='mt-2'>
									<input
										{...register('last_name')}
										type='text'
										name='last_name'
										id='last_name'
										placeholder='John Doe'
										autoComplete='given-name'
										disabled={isSubmitting}
										className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
									/>
									<div className='h-4 mt-1 text-xs font-medium text-red-400'>
										{errors.last_name?.message}
									</div>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6'
							>
								Email
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
