import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import { signupSchema } from '@/pages/signup';
import { realisticConfetti } from '@/utils/confetti-animation';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BASE_URL } from '@/config';

export function useSignup() {
	const navigate = useNavigate();
	const { setToken } = useAuth();
	const { toast } = useToast();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: z.infer<typeof signupSchema>) => {
			const response = await fetch(`${BASE_URL}/auth/signup`, {
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
				title: 'Account creato',
				description: 'Registrazione avvenuta con successo.',
			});

			realisticConfetti();

			console.log(data);

			setTimeout(() => {
				navigate('/bookings', { replace: true, state: { from: '/' } });
			}, 1500);
		},
		onError: (error: Error) => {
			console.log('ERRORE: ', error.message);

			toast({
				variant: 'destructive',
				title: 'Uh oh! Qualcosa è andato storto.',
				description: "C'è stato un problema con la tua richiesta.",
			});
		},
	});

	return { mutate, isPending };
}
