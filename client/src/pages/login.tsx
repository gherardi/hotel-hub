import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { Loader2 } from 'lucide-react';

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

import { Toaster } from '@/components/ui/toaster';
// import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

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
					<div className='mx-auto grid w-full md:w-[350px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Accedi</h1>
							<p className='leading-5 text-muted-foreground'>
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
					<Toaster />
				</div>
			</section>
		</>
	);
}

function LoginForm() {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: 'gherardivictor@gmail.com',
			password: 'qwerty123.',
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		await new Promise((res) => setTimeout(res, 2000));

		// if (Math.random() > 0.5) {
		// 	toast({
		// 		variant: 'destructive',
		// 		title: 'Uh oh! Qualcosa è andato storto.',
		// 		description: "C'è stato un problema con la tua richiesta.",
		// 		action: <ToastAction altText='Try again'>Riprova</ToastAction>,
		// 	});
		// 	return;
		// }
		toast({
			title: 'Accesso effettuato',
			description: 'Login avvenuto con successo.',
		});
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
							Accesso in corso
						</>
					) : (
						<>
							<Mail className='mr-2 h-4 w-4' />
							Accedi con l'email
						</>
					)}
				</Button>
				<Button variant='outline' className='w-full hidden'>
					Accedi con Google
				</Button>
			</form>
		</Form>
	);
}
