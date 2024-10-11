import NavBar from '@/components/landing/navbar';
import { Link } from 'react-router-dom';
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
import {
	loginSchema,
	type loginSchemaType,
} from '@/components/auth/auth-schema';
import { useLogin } from '@/hooks/useLogin';

export default function Login() {
	const { login, isLoading } = useLogin();

	const form = useForm<loginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = function (values: loginSchemaType) {
		login(values, {
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
								<Button
									type='submit'
									className='flex items-center w-full mt-2'
									disabled={isLoading}
								>
									{isLoading ? (
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
