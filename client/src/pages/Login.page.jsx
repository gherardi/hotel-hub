import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import validator from 'validator';
import useLocalStorage from '../hooks/useLocalStorage.jsx';

const schema = z.object({
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

export default function LoginPage() {
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
			const res = await axios.post('http://localhost:3000/api/auth/login', data);
			const { token } = res.data;

			setItem(token);
			document.cookie = `jwt=${token}`;

			navigate('/dashboard', { replace: true, state: { from: '/' } });
		} catch (err) {
			if(err.code === 'ERR_NETWORK') {
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
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
						Log in to your account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
								Email address
							</label>
							<div className='mt-2'>
								<input
									{...register('email')}
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									placeholder='email@example.com'
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
								<div className='text-sm'>
									<a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									{...register('password')}
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									placeholder='••••••••'
									required
									disabled={isSubmitting}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
								<div className='h-4 mt-1 text-xs font-medium text-red-400'>
									{errors.password?.message}
								</div>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								{isSubmitting ? 'Loading...' : 'Log in'}
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
