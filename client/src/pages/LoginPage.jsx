wimport { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import validator from 'validator';

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
		.refine((value) => validator.isStrongPassword(value), {
			message: 'Please provide a stronger password! [uppercase/lowercase, numbers, symbols]',
		}),
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

	const onSubmit = async function (data) {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// throw new Error();
			console.log(data);
		} catch (err) {
			// setError('email', {
			setError('root', {
				message: 'this email is alrady taken',
			});
		}
	};

	return (
		<div className='h-svh' onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<p>This is the login page.</p>
			<form>
				<input
					{...register('email')}
					type='text'
					placeholder='Email'
					autoComplete='email'
					disabled={true}
					// disabled={isSubmitting}
				/>
				{errors.email && <p className='text-red-400'>{errors.email.message}</p>}

				{/* todo: creare un componente wrapper password che abbia un toggle per vedere la password */}
				<input
					{...register('password')}
					type='password'
					placeholder='Password'
					autoComplete='off'
					disabled={isSubmitting}
				/>
				{errors.password && <p className='text-red-400'>{errors.password.message}</p>}

				<button disabled={isSubmitting} type='submit'>
					{isSubmitting ? 'Loading...' : 'Submit'}
				</button>
				{errors.root && <p className='text-red-400'>{errors.root.message}</p>}
			</form>
		</div>
	);
}
