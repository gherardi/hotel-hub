import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import SettingsLayout from '@/layouts/settings-layout';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/components/auth-provider';
import { BASE_URL } from '@/config';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

export const profileSchema = z.object({
	first_name: z
		.string()
		.min(2, { message: 'Il nome deve essere almeno di 2 caratteri' }),
	last_name: z
		.string()
		.min(2, { message: 'Il cognome deve essere almeno di 2 caratteri' }),
	email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
});

export default function Profile() {
	const { token } = useAuth();

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
		},
	});

	const { isFetching } = useQuery({
		queryFn: async () => {
			const response = await fetch(`${BASE_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const resData = await response.json();
			const { data } = resData;

			for (const key in data) {
				const value = data[key];
				form.setValue(key as 'first_name' | 'last_name' | 'email', value);
			}
			return data;
		},
		queryKey: ['profilo'],
	});

	if (isFetching) {
		form.setValue('first_name', 'caricamento...');
		form.setValue('last_name', 'caricamento...');
		form.setValue('email', 'caricamento...');
	}

	const { mutate, isPending: isUpdating } = useUpdateProfile();

	return (
		<SettingsLayout>
			<div className='mx-auto w-full max-w-6xl'>
				<h2 className='text-3xl font-bold tracking-tight'>Il tuo account</h2>
			</div>

			<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
				<nav className='grid gap-4 text-sm text-muted-foreground'>
					<p className='cursor-pointer font-semibold text-primary'>Profilo</p>
				</nav>
				<div className='grid gap-6'>
					<Card>
						<CardHeader>
							<CardTitle>Plugins Directory</CardTitle>
							<CardDescription>
								The directory within your project, in which your plugins are
								located.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									className='flex flex-col gap-4'
									onSubmit={form.handleSubmit((data) => mutate(data))}
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
														placeholder='Mario'
														disabled={isUpdating}
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
														placeholder='Rossi'
														disabled={isUpdating}
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
														disabled={isUpdating}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div>
										<Button type='submit' disabled={isUpdating}>
											Salva
										</Button>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</SettingsLayout>
	);
}
