import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';

import { BASE_URL } from '@/config';

export function useFetchSummaryCards() {
	const { token } = useAuth();
	const { toast } = useToast();

	const { isPending, error, data } = useQuery({
		queryKey: ['summary-cards'],
		queryFn: async () => {
			const fetchPrenotazioni = fetch(`${BASE_URL}/bookings`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const tassoOccupazione = fetch(`${BASE_URL}/rooms`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const responses = await Promise.all([
				fetchPrenotazioni,
				tassoOccupazione,
			]);
			const resData = await Promise.all(
				responses.map((res) => res.json())
			);

			return resData;
		},
	});

	if (error) {
		toast({
			variant: 'destructive',
			title: 'Uh oh! Qualcosa è andato storto.',
			description: error.message
				? error.message
				: "C'è stato un problema con la tua richiesta.",
			// action: <ToastAction altText='Try again'>Riprova</ToastAction>,
		});
	}

	return { data, isPending, error };
}
