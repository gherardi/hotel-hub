import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import PageWrapper from '@/components/wrapper/page-wrapper';
import { Button } from '@/components/ui/button';
import { supabase } from '@/database/supabase-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
	signupSchema,
	type signupSchemaType,
} from '@/components/auth/auth-schema';

export default function Signup() {
	const navigate = useNavigate();
	const { toast } = useToast();

	const form = useForm<signupSchemaType>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
	});

	const onSubmit = async function (values: signupSchemaType) {
		const { data, error } = await supabase.auth.signUp({
			email: values.email.trim(),
			password: values.password,
			options: {
				data: {
					first_name: values.first_name.trim(),
					last_name: values.last_name.trim(),
				},
			},
		});

		if (error) {
			toast({
				variant: 'destructive',
				title: 'Errore durante la registrazione',
				description:
					error.message || "Si è verificato un errore durante l'autenticazione",
			});
			return;
		}

		if (data) {
			toast({
				title: 'Link di conferma inviato alla tua mail',
				description:
					'Controlla la tua casella di posta e conferma la registrazione',
			});
			navigate('/login');
		}
	};

	return (
		<PageWrapper>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-full md:w-[360px] gap-6'>
					<div className='grid gap-2'>
						<h1 className='text-3xl font-bold'>Registrati</h1>
						<p className='leading-5 text-muted-foreground'>
							Inserisci le tue credenziali qui sotto per creare un nuovo account
						</p>
					</div>
					<Form {...form}>
						<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='first_name'
								render={({ field }) => (
									<FormItem className='grid gap-2 space-y-0'>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='John'
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
									<FormItem className='grid gap-2 space-y-0'>
										<FormLabel>Cognome</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Doe'
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
								name='repeatPassword'
								render={({ field }) => (
									<FormItem className='grid gap-2 space-y-0'>
										<FormLabel>Ripeti password</FormLabel>
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
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />{' '}
										Registrazione in corso
									</>
								) : (
									'Registrati'
								)}
							</Button>
						</form>
					</Form>
					<div className='mt-4 text-sm text-center'>
						Hai già un account?{' '}
						<Link to='/login' className='underline'>
							Accedi
						</Link>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}
