import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Header from '@/components/sections/header';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

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

import { Toaster } from '@/components/ui/toaster';
// import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

import { realisticConfetti } from '@/utils/confetti-animation';
import { useAuth } from '@/components/auth-provider';

const signupSchema = z.object({
	first_name: z
		.string()
		.min(2, { message: 'Il nome deve essere almeno di 2 caratteri' }),
	last_name: z
		.string()
		.min(2, { message: 'Il cognome deve essere almeno di 2 caratteri' }),

	email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
	password: z.string().min(8, {
		message: 'La password deve essere di almeno 8 caratteri',
	}),
	hotel_id: z
		.string()
		.startsWith('HOTEL-', { message: 'Codice hotel non valido' }),
});

// TODO: METTERE PARTE SE EMAIL è GIA REGISTRATA E MAGARI QUANTO è STRONG LA PASSWORD

export default function Signup() {
	return (
		<>
			<Header />
			<section className='w-full h-[--hero-height] overflow-hidden container'>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-full md:w-[400px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Registrazione</h1>
							<p className='leading-5 text-muted-foreground'>
								Inserisci le tue informazioni qui sotto per creare un account
							</p>
						</div>
						<SignupForm />
						<div className='mt-4 text-center text-sm'>
							Hai già un account?{' '}
							<Link to='/login' className='underline'>
								Accedi
							</Link>
						</div>
					</div>
					<Toaster />
				</div>
			</section>
		</>
	);
}

function SignupForm() {
	const navigate = useNavigate();
	const { setToken } = useAuth();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			first_name: 'Victor',
			last_name: 'Gherardi',
			email: 'gherardivictor@gmail.com',
			password: 'qwerty123.',
			hotel_id: 'HOTEL-DER',
		},
	});

	async function onSubmit(data: z.infer<typeof signupSchema>) {
		await new Promise((res) => setTimeout(res, 2000));
		console.log(data);
		toast({
			title: 'Account creato',
			description: 'Registrazione avvenuta con successo.',
		});

		realisticConfetti();

		const token = crypto.randomUUID();
		localStorage.setItem('token', token);
		setToken(token);

		setTimeout(() => {
			navigate('/dashboard', { replace: true});
		}, 2000);
	}

	return (
		<Form {...form}>
			<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-x-4'>
					<FormField
						control={form.control}
						name='first_name'
						render={({ field }) => (
							<FormItem className='grid gap-2 space-y-0 place-content-start'>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Mario'
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='last_name'
						render={({ field }) => (
							<FormItem className='grid gap-2 space-y-0 place-content-start'>
								<FormLabel>Cognome</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Rossi'
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='email@example.com'
									disabled={form.formState.isSubmitting}
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
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									disabled={form.formState.isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='hotel_id'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Codice hotel</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='HOTEL-DE3F'
									disabled={form.formState.isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Registrazione in corso
						</>
					) : (
						<>Crea un account</>
					)}
				</Button>
				<Button variant='outline' className='w-full hidden'>
					Accedi con Google
				</Button>
			</form>
		</Form>
	);
}
