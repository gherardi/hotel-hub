import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import validator from 'validator';
import useLocalStorage from '../hooks/useLocalStorage.jsx';

const schema = z.object({
	name: z.string(),
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
			setError('root', {
				message: err.response.data.message,
			});
		}
	};

	return (
		// <div className='flex items-center justify-center w-full h-full'>
		<div className=''>
			{/* <div className='w-1/4 p-8 rounded-xl bg-neutral-800'> */}
			<div className=''>
				{/* <h4 className='mb-5 text-2xl font-semibold'>Signup</h4> */}
				<h4 className=''>Signup</h4>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
					<div>
						<label htmlFor='name' className='block mb-1 text-sm font-medium'>
							Name
						</label>
						<input
							{...register('name')}
							type='text'
							id='name'
							placeholder='John Doe'
							autoComplete='name'
							disabled={isSubmitting}
						/>
						<div className='h-4 mt-1 text-xs text-red-400'>{errors.name?.message}</div>
					</div>

					<div>
						<label htmlFor='email' className='block mb-1 text-sm font-medium'>
							Email
						</label>
						<input
							{...register('email')}
							type='text'
							id='email'
							placeholder='email@example.com'
							autoComplete='email'
							disabled={isSubmitting}
						/>
						<div className='h-4 mt-1 text-xs text-red-400'>{errors.email?.message}</div>
					</div>

					<div>
						<label htmlFor='password' className='block mb-1 text-sm font-medium'>
							Password
						</label>
						<input
							{...register('password')}
							type='password'
							id='password'
							placeholder='••••••••'
							autoComplete='off'
							disabled={isSubmitting}
						/>
						<div className='h-4 mt-1 text-xs text-red-400'>{errors.password?.message}</div>
					</div>

					<div className='pt-2'>
						<button
							type='submit'
							disabled={isSubmitting}
							// className='block w-full py-2 font-medium text-center transition bg-indigo-600 rounded disabled:opacity-75 hover:bg-indigo-700'
						>
							{isSubmitting ? 'Loading...' : 'Submit'}
						</button>
						<div className='h-4 mt-1 text-xs text-red-400'>{errors.root?.message}</div>
					</div>
				</form>
			</div>
		</div>
	);
}
