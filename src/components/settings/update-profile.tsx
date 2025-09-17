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
	updateProfileSchema,
	type updateProfileSchemaType,
} from '@/components/auth/auth-schema';
import { useUser } from '@/hooks/useUser';
import { useUpdateUser } from '@/hooks/useUpdateUser';

export function UpdateProfile() {
	const { user } = useUser();
	const { updateUser, isUpdating } = useUpdateUser();

	const form = useForm<updateProfileSchemaType>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			first_name: user?.user_metadata.first_name,
			last_name: user?.user_metadata?.last_name,
			email: user?.email,
		},
	});

	const onSubmit = function (values: updateProfileSchemaType) {
		updateUser(values);
	};

	return (
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
									placeholder='Doe'
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

				<div className='mt-2'>
					<Button
						type='submit'
						className='flex items-center ml-auto'
						disabled={isUpdating}
					>
						{isUpdating ? (
							<>
								<Loader2 className='w-4 h-4 mr-2 animate-spin' /> Aggiornamento
							</>
						) : (
							'Salva profilo'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
