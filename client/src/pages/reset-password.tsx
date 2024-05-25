import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';

import Header from '@/components/sections/header';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { realisticConfetti } from '@/utils/confetti-animation';
import { isValidUUID } from '@/utils/helpers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const resetPasswordSchema = z.object({
	password: z.string().min(8, {
		message: 'La password deve essere di almeno 8 caratteri',
	}),
});

export default function ResetPassword() {
	const { toast } = useToast();

	const params = useParams();
	const token = params.token;
	const isValidToken = isValidUUID(token);

	useEffect(() => {
		if (!isValidToken) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Qualcosa è andato storto.',
				description: 'Sembra che il tuo token non sia valido.',
				action: <ToastAction altText='Try again'>Riprova</ToastAction>,
			});
		}
	}, [isValidToken, toast]);

	return (
		<>
			<Header />
			<section className='w-full h-[--hero-height] overflow-hidden container'>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-full md:w-[400px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Modifica password</h1>
							<p className='leading-5 text-muted-foreground'>
								Inserisci qui la tua nuova password
							</p>
						</div>
						<ResetpasswordForm isValidToken={isValidToken} />
					</div>
					<Toaster />
				</div>
			</section>
		</>
	);
}

export function ResetpasswordForm({ isValidToken }: { isValidToken: boolean }) {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: 'password-resettata',
		},
	});

	async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
		await new Promise((res) => setTimeout(res, 2000));
		console.log(data);
		toast({
			title: 'Password modificata',
			description: 'Modifica della password avvenuta con successo.',
			action: (
				<ToastAction altText='Login'>
					<Link to='/login' reloadDocument={true}>
						Accedi
					</Link>
				</ToastAction>
			),
		});

		realisticConfetti();
	}

	return (
		<Form {...form}>
			<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='mx-auto hidden'>
					<InputOTP maxLength={6} className='mx-auto'>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				</div>
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
									disabled={form.formState.isSubmitting || !isValidToken}
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
					disabled={form.formState.isSubmitting || !isValidToken}
				>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Modifica in corso
						</>
					) : !isValidToken ? (
						'Token non valido'
					) : (
						'Modifica password'
					)}
				</Button>
			</form>
		</Form>
	);
}
