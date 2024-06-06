import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import { Room } from '@/components/rooms/columns';

import { BASE_URL } from '@/config';

export function useFetchBookings() {
	const { token } = useAuth();
	const { toast } = useToast();

	const { isPending, error, data } = useQuery<Room[]>({
		queryKey: ['bookings'],
		queryFn: async () => {
			const response = await fetch(`${BASE_URL}/bookings`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const resData = await response.json();
			if (resData.status !== 'success') throw new Error(resData.message);
			return resData.data;
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
