import NavBar from '@/components/landing/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/database/supabase-client';
import {
	loginSchema,
	type loginSchemaType,
} from '@/components/auth/auth-schema';

export default function Login() {
	const navigate = useNavigate();
	const { toast } = useToast();

	const form = useForm<loginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async function (values: loginSchemaType) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Errore di autenticazione',
				description:
					error.message || "Si è verificato un errore durante l'autenticazione",
			});
			return;
		}
		if (data) {
			toast({
				title: 'Accesso effettuato',
				description: 'Benvenuto!',
			});
			navigate('/bookings');
		}
	};

	return (
		<>
			<NavBar />
			<main className='flex min-w-screen min-h-svh flex-col pt-[4rem] items-center justify-between'>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-full md:w-[360px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Accedi</h1>
							<p className='leading-5 text-muted-foreground'>
								Inserisci la tua email qui sotto per accedere al tuo account
							</p>
						</div>
						<Form {...form}>
							<form
								className='grid gap-4'
								onSubmit={form.handleSubmit(onSubmit)}
							>
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
								<Button
									type='submit'
									className='flex items-center w-full mt-2'
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className='w-4 h-4 mr-2 animate-spin' /> Accesso
											in corso
										</>
									) : (
										'Accedi'
									)}
								</Button>
							</form>
						</Form>
						<div className='mt-4 text-sm text-center'>
							Non hai un account?{' '}
							<Link to='/signup' className='underline'>
								Registrati
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
