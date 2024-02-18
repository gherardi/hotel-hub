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

			navigate('/dashboard');
		} catch (err) {
			console.log(err);
			// setError('email', {
			setError('root', {
				message: err.response.data.message,
			});
		}
	};

	return (
		<div className='h-svh' onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<p>This is the login page.</p>
			<form>
				<div>
					<input
						{...register('email')}
						type='text'
						placeholder='Email'
						autoComplete='email'
						disabled={isSubmitting}
					/>
					{errors.email && <p className='text-red-400'>{errors.email.message}</p>}
				</div>

				{/* todo: creare un componente wrapper password che abbia un toggle per vedere la password */}
				<div>
					<input
						{...register('password')}
						type='password'
						placeholder='Password'
						autoComplete='off'
						disabled={isSubmitting}
					/>
					{errors.password && <p className='text-red-400'>{errors.password.message}</p>}
				</div>
				<button disabled={isSubmitting} type='submit'>
					{isSubmitting ? 'Loading...' : 'Submit'}
				</button>
				{errors.root && <p className='text-red-400'>{errors.root.message}</p>}
			</form>
		</div>
	);
}
