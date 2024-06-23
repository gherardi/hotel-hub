import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import HomeLayout from '@/layouts/home-layout';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useSignup } from '@/hooks/useSignup';

export const signupSchema = z.object({
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
	hotel_code: z
		.string()
		.startsWith('HOTEL-', { message: 'Codice hotel non valido' }),
});

export default function Signup() {
	return (
		<HomeLayout>
			<div className='flex items-center justify-center pt-12'>
				<div className='mx-auto grid w-full md:w-[480px] gap-6'>
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
			</div>
		</HomeLayout>
	);
}

function SignupForm() {
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			first_name: 'Victor',
			last_name: 'Gherardi',
			email: 'gherardivictor@gmail.com',
			password: 'qwerty123.',
			hotel_code: 'HOTEL_PALEO',
		},
	});

	const { mutate, isPending: isSigningUp } = useSignup();

	return (
		<Form {...form}>
			<form
				className='grid gap-4'
				onSubmit={form.handleSubmit((data) => mutate(data))}
			>
				<div className='grid grid-cols-2 gap-x-4'>
					<FormField
						control={form.control}
						name='first_name'
						render={({ field }) => (
							<FormItem className='space-y-1.5 place-content-start'>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Mario'
										disabled={isSigningUp}
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
							<FormItem className='space-y-1.5 place-content-start'>
								<FormLabel>Cognome</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Rossi'
										disabled={isSigningUp}
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
									disabled={isSigningUp}
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
									disabled={isSigningUp}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='hotel_code'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Codice hotel</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='HOTEL-DE3F'
									disabled={isSigningUp}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full' disabled={isSigningUp}>
					{isSigningUp && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{isSigningUp && 'Registrazione in corso...'}

					{!isSigningUp && 'Crea un account'}
				</Button>
				{/* <Button variant='outline' className='w-full hidden'>
					Accedi con Google
				</Button> */}
			</form>
		</Form>
	);
}
