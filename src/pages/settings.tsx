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
import { Sidebar } from '@/components/app/sidebar';
import { Header } from '@/components/app/header';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/database/supabase-client';
import {
	updateProfileSchema,
	type updateProfileSchemaType,
} from '@/components/auth/auth-schema';
import { useEffect } from 'react';

export default function Settings() {
	const { toast } = useToast();

	const form = useForm<updateProfileSchemaType>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
		},
	});

	const getUserData = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			form.setValue('first_name', user.user_metadata?.first_name || '');
			form.setValue('last_name', user.user_metadata?.last_name || '');
			form.setValue('email', user.email || '');
		}
	};

	useEffect(() => {
		getUserData();
	}, [form]);

	const onSubmit = async function (values: updateProfileSchemaType) {
		const { data, error } = await supabase.auth.updateUser({
			email: values.email,
			data: {
				first_name: values.first_name,
				last_name: values.last_name,
			},
		});

		if (error) {
			toast({
				variant: 'destructive',
				title: "Errore durante l'aggiornamento del profilo",
				description:
					error.message ||
					"Si è verificato un errore durante l'aggiornamento del profilo",
			});
			return;
		}

		if (data) {
			toast({
				title: 'Profilo aggiornato con successo',
				description: 'Il tuo profilo è stato aggiornato con successo',
			});
		}
	};

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block'>
				<Sidebar />
			</div>
			<div className='flex flex-col'>
				<Header />
				<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
					<div className='flex items-center'>
						<h1 className='text-lg font-semibold md:text-2xl'>Profilo</h1>
					</div>
					<div className='flex-1 rounded-lg'>
						<Form {...form}>
							<form
								className='grid gap-4 sm:max-w-md'
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

								<div className='mt-2'>
									<Button
										type='submit'
										className='flex items-center ml-auto'
										disabled={form.formState.isSubmitting}
									>
										{form.formState.isSubmitting ? (
											<>
												<Loader2 className='w-4 h-4 mr-2 animate-spin' />{' '}
												Aggiornamento
											</>
										) : (
											'Salva profilo'
										)}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</main>
			</div>
		</div>
	);
}
