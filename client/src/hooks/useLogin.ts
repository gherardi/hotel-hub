import { useAuth } from '@/components/auth-provider';
// import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { loginSchema } from '@/pages/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BASE_URL } from '@/config';

export function useLogin() {
	const navigate = useNavigate();
	const { setToken } = useAuth();
	const { toast } = useToast();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: z.infer<typeof loginSchema>) => {
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const resData = await response.json();
			if (resData.status !== 'success') throw new Error(resData.message);
			return resData;
		},
		onSuccess: (data) => {
			localStorage.setItem('token', data.token);
			setToken(data.token);

			toast({
				title: 'Accesso effettuato',
				description: 'Login avvenuto con successo.',
			});

			console.log(data);

			setTimeout(() => {
				navigate('/dashboard', { replace: true, state: { from: '/' } });
			}, 1500);
		},
		onError: (error: Error) => {
			console.log('errore', error.message);

			toast({
				variant: 'destructive',
				title: 'Uh oh! Qualcosa è andato storto.',
				description: error.message
					? error.message
					: "C'è stato un problema con la tua richiesta.",
				// action: <ToastAction altText='Try again'>Riprova</ToastAction>,
			});
		},
	});

	return { mutate, isPending };
}

// const { mutate, isPending } = useMutation({
// 	mutationFn: async (data: z.infer<typeof loginSchema>) => {
// 		const res = await fetch('http://localhost:3000/api/auth/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 		});
// 		const resData = await res.json();
// 		if (resData.status !== 'success') throw new Error(resData.message);
// 		return resData;
// 	},
// 	onSuccess: (data) => {
// 		toast({
// 			title: 'Accesso effettuato',
// 			description: 'Login avvenuto con successo.',
// 		});

// 		localStorage.setItem('token', data.token);
// 		setToken(data.token);

// 		navigate('/dashboard', { replace: true, state: { from: '/' } });
// 	},
// 	onError: (error) => console.log('errore', error),
// });

// async function onSubmit(values: z.infer<typeof loginSchema>) {
// 	mutate(values);
// 	return;
// 	// Do something with the form values.
// 	// ✅ This will be type-safe and validated.
// 	console.log(values);
// 	await new Promise((res) => setTimeout(res, 2000));

// 	// if (Math.random() > 0.5) {
// 	// 	toast({
// 	// 		variant: 'destructive',
// 	// 		title: 'Uh oh! Qualcosa è andato storto.',
// 	// 		description: "C'è stato un problema con la tua richiesta.",
// 	// 		action: <ToastAction altText='Try again'>Riprova</ToastAction>,
// 	// 	});
// 	// 	return;
// 	// }
// 	toast({
// 		title: 'Accesso effettuato',
// 		description: 'Login avvenuto con successo.',
// 	});

// 	const token = crypto.randomUUID();
// 	localStorage.setItem('token', token);
// 	setToken(token);

// 	setTimeout(() => {
// 		navigate('/dashboard', { replace: true });
// 	}, 2000);
// }

// const navigate = useNavigate();
// const { toast } = useToast();

// const { setToken } = useAuth();
