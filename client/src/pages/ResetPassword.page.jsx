import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import validator from 'validator';

export default function ResetPasswordPage() {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const { token } = useParams();

	const handleClick = async function () {
		if (
			!validator.isStrongPassword(password, {
				minUppercase: 0,
				minNumbers: 0,
				minLength: 8,
				minSymbols: 1,
			})
		) {
			setError('Please provide a stronger password');
			return;
		}
		try {
			// use backticks instead of single quotes
			const res = await fetch(
				`http://localhost:3000/api/auth/resetPassword/${token}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ password }),
				}
			);
			if (res.status === 401)
				return setError('Please provide a stronger password');

			const data = await res.json();

			if (data.status === 'success') navigate('/login', { replace: true });
		} catch (err) {
			setError('An error occurred. Please try again later!');
		}
	};

	return (
		<div className='h-full py-24 bg-background lg:py-32'>
			<div className='px-6 mx-auto max-w-7xl lg:px-8'>
				<div className='max-w-2xl mx-auto gap-x-8 gap-y-16 lg:max-w-none'>
					<div className='max-w-2xl mx-auto lg:max-w-xl'>
						<h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
							Create a new password for your account
						</h2>
						<div className='flex mt-6 gap-x-4'>
							<input
								value={password}
								onChange={(e) => {
									setError('');
									setPassword(e.target.value);
								}}
								id='password'
								name='password'
								type='password'
								autoComplete='password'
								required
								className='block w-full border-0 rounded-md py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								placeholder='********'
							/>
							<button
								onClick={handleClick}
								className='flex-none rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
							>
								Change password
							</button>
						</div>
						<div className='mt-2 text-xs font-medium text-red-400'>{error}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
