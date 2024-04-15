import { useState } from 'react';
import validator from 'validator';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const handleClick = async function () {
		if (!validator.isEmail(email)) {
			setError('Please provide a valid email');
			return;
		}
		try {
			console.log(email);
			const res = await fetch('http://localhost:3000/api/auth/forgotPassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			if (res.status === 401)
				return setError('non esistono account con questa email');

			const data = await res.json();

			if (data.status === 'success')
				alert(
					'ResetURL sent to your email! follow the link to reset your password'
				);
		} catch (err) {
			setError('There is no account with this email');
		}
	};

	return (
		<div className='h-full py-24 bg-background lg:py-32'>
			<div className='px-6 mx-auto max-w-7xl lg:px-8'>
				<div className='max-w-2xl mx-auto gap-x-8 gap-y-16 lg:max-w-none'>
					<div className='max-w-2xl mx-auto lg:max-w-xl'>
						<h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
							Send a password reset link.
						</h2>
						<div className='flex mt-6 gap-x-4'>
							<input
								value={email}
								onChange={(e) => {
									setError('');
									setEmail(e.target.value);
								}}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='block w-full border-0 rounded-md py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
								placeholder='email@example.com'
							/>
							<button
								onClick={handleClick}
								className='flex-none rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
							>
								Send email
							</button>
						</div>
						<div className='mt-2 text-xs font-medium text-red-400'>{error}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
