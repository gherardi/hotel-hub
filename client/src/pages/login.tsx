import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Header from '@/components/sections/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

// TODO: METTERE PARTE SE EMAIL è GIA REGISTRATA E MAGARI QUANTO è STRONG LA PASSWORD

const loginSchema = z.object({
	email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
	password: z.string().min(8, {
		message: 'La password deve essere di almeno 8 caratteri',
	}),
});

export default function Login() {
	return (
		<>
			<Header />
			<section className='w-full lg:grid h-[--hero-height] lg:grid-cols-2 overflow-hidden container'>
				<div className='hidden bg-muted lg:block'>
					<img
						src='/placeholder.svg'
						alt='Image'
						width='1920'
						height='1080'
						className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
					/>
				</div>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-[350px] gap-6'>
						<div className='grid gap-2 md:text-center'>
							<h1 className='text-3xl font-bold'>Login</h1>
							<p className='md:text-balance leading-5 text-muted-foreground'>
								Inserisci la tua email qui sotto per accedere al tuo account
							</p>
						</div>
						<LoginForm />
						<div className='mt-4 text-center text-sm'>
							Non hai un account?{' '}
							<Link to='#' className='underline'>
								Registrati
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

function LoginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		alert(values);
	}

	return (
		<Form {...form}>
			<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									id='email'
									type='email'
									placeholder='email@example.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<div className='flex items-center'>
								<FormLabel>Password</FormLabel>
								<Link
									to='/forgot-password'
									className='ml-auto inline-block text-sm underline'
								>
									Password dimenticata?
								</Link>
							</div>
							<FormControl>
								<Input
									id='password'
									type='password'
									placeholder='********'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Accedi
				</Button>
				<Button variant='outline' className='w-full'>
					Accedi con Google
				</Button>
			</form>
		</Form>
	);
}
