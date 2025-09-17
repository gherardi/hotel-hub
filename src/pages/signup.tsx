import NavBar from '@/components/landing/navbar';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import {
	signupSchema,
	type signupSchemaType,
} from '@/components/auth/auth-schema';
import { useSignup } from '@/hooks/useSignup';

export default function Signup() {
	const { signup, isLoading } = useSignup();
	// const navigate = useNavigate();
	// const { toast } = useToast();

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
		signup(values, {
			onSettled: () => form.reset(),
		});
	};

	return (
		<>
			<NavBar />
			<main className='flex min-w-screen min-h-svh flex-col pt-[4rem] items-center justify-between'>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-full md:w-[360px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Registrati</h1>
							<p className='leading-5 text-muted-foreground'>
								Inserisci le tue credenziali qui sotto per creare un nuovo
								account
							</p>
						</div>
						<Form {...form}>
							<form
								className='grid gap-4'
								onSubmit={form.handleSubmit(onSubmit)}
							>
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
													disabled={isLoading}
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
													disabled={isLoading}
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
													disabled={isLoading}
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
													disabled={isLoading}
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
													disabled={isLoading}
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
									disabled={isLoading}
								>
									{isLoading ? (
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
			</main>
		</>
	);
}
