import Header from '@/components/sections/header';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

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

import { realisticConfetti } from '@/utils/confetti-animation';

const signupSchema = z.object({
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
	hotel_id: z
		.string()
		.startsWith('HOTEL-', { message: 'Codice hotel non valido' }),
});

// TODO: METTERE PARTE SE EMAIL è GIA REGISTRATA E MAGARI QUANTO è STRONG LA PASSWORD

export default function Signup() {
	return (
		<>
			<Header />
			<section className='w-full h-[--hero-height] overflow-hidden container'>
				<div className='flex items-center justify-center py-12'>
					<div className='mx-auto grid w-full md:w-[400px] gap-6'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>Registrazione</h1>
							<p className='leading-5 text-muted-foreground'>
								Inserisci le tue informazioni qui sotto per creare un account
							</p>
						</div>
						<SignupForm />
					</div>
					<Toaster />
				</div>
			</section>
		</>
	);
}

function SignupForm() {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			first_name: 'Victor',
			last_name: 'Gherardi',
			email: 'gherardivictor@gmail.com',
			password: 'qwerty123.',
			hotel_id: 'HOTEL-DER',
		},
	});

	async function onSubmit(data: z.infer<typeof signupSchema>) {
		await new Promise((res) => setTimeout(res, 2000));
		console.log(data);
		toast({
			title: 'Account creato',
			description: 'Registrazione avvenuta con successo.',
		});

		realisticConfetti();
	}

	return (
		<Form {...form}>
			<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-x-4'>
					<FormField
						control={form.control}
						name='first_name'
						render={({ field }) => (
							<FormItem className='grid gap-2 space-y-0 place-content-start'>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										id='first_name'
										type='text'
										placeholder='Mario'
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
							<FormItem className='grid gap-2 space-y-0 place-content-start'>
								<FormLabel>Cognome</FormLabel>
								<FormControl>
									<Input
										id='last_name'
										type='text'
										placeholder='Rossi'
										disabled={form.formState.isSubmitting}
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
							<FormLabel>Password</FormLabel>
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

				<FormField
					control={form.control}
					name='hotel_id'
					render={({ field }) => (
						<FormItem className='grid gap-2 space-y-0'>
							<FormLabel>Codice hotel</FormLabel>
							<FormControl>
								<Input
									id='hotel_id'
									type='text'
									placeholder='HOTEL-DE3F'
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
							Registrazione in corso
						</>
					) : (
						<>Crea un account</>
					)}
				</Button>
				<Button variant='outline' className='w-full hidden'>
					Accedi con Google
				</Button>
			</form>
		</Form>
	);
}

{
	/* <form className='space-y-4'>
<div className='grid grid-cols-2 gap-4'>
<div className='space-y-2'>
<Label htmlFor='firstName'>First Name</Label>
<Input id='firstName' />
<p className='text-red-500' />
</div>
<div className='space-y-2'>
<Label htmlFor='lastName'>Last Name</Label>
<Input id='lastName' />
<p className='text-red-500' />
</div>
</div>
<div className='space-y-2'>
<Label htmlFor='email'>Email</Label>
<Input id='email' type='email' />
<p className='text-red-500' />
</div>
<div className='space-y-2'>
<Label htmlFor='password'>Password</Label>
<Input id='password' type='password' />
<p className='text-red-500' />
</div>
<div className='space-y-2'>
<Label htmlFor='hotelCode'>Hotel Code</Label>
<Input id='hotelCode' />
<p className='text-red-500' />
</div>
<Button className='w-full' type='submit'>
Registrati
</Button>
</form> */
}

// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import {
// Card,
// CardContent,
// CardDescription,
// CardHeader,
// CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function LoginForm() {
// return (
// <Card className="mx-auto max-w-sm">
// <CardHeader>
// <CardTitle className="text-xl">Sign Up</CardTitle>
// <CardDescription>
// Enter your information to create an account
// </CardDescription>
// </CardHeader>
// <CardContent>
// <div className="grid gap-4">
// <div className="grid grid-cols-2 gap-4">
// <div className="grid gap-2">
// <Label htmlFor="first-name">First name</Label>
// <Input id="first-name" placeholder="Max" required />
// </div>
// <div className="grid gap-2">
// <Label htmlFor="last-name">Last name</Label>
// <Input id="last-name" placeholder="Robinson" required />
// </div>
// </div>
// <div className="grid gap-2">
// <Label htmlFor="email">Email</Label>
// <Input
// id="email"
// type="email"
// placeholder="m@example.com"
// required
// />
// </div>
// <div className="grid gap-2">
// <Label htmlFor="password">Password</Label>
// <Input id="password" type="password" />
// </div>
// <Button type="submit" className="w-full">
// Create an account
// </Button>
// <Button variant="outline" className="w-full">
// Sign up with GitHub
// </Button>
// </div>
// <div className="mt-4 text-center text-sm">
// Already have an account?{" "}
// <Link href="#" className="underline">
// Sign in
// </Link>
// </div>
// </CardContent>
// </Card>
// )
// }
