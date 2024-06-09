import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import { bookingSchema } from '@/components/bookings/createBookingForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { BASE_URL } from '@/config';

export function useCreateBooking() {
	const { toast } = useToast();
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: async (data: z.infer<typeof bookingSchema>) => {
			const response = await fetch(`${BASE_URL}/bookings`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			const resData = await response.json();
			if (resData.status !== 'success') throw new Error(resData.message);
			return resData;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			});

			toast({
				title: 'Successo',
				description: 'Prenotazione creata con successo!',
			});
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

	return { mutate, isPending, isSuccess };
}
