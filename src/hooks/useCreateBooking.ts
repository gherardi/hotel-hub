import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createBooking as createBookingApi } from '@/services/apiBookings';
import { useToast } from '@/hooks/use-toast';

export function useCreateBooking() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: createBooking, isPending: isCreating } = useMutation({
		mutationFn: createBookingApi,
		onSuccess: () => {
			toast({
				title: 'Prenotazione aggiunta',
				description: 'Prenotazione aggiunta con successo!',
			});
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Errore di inserimento',
				description:
					error.message || "Errore durante l'inserimento della prenotazione",
			});
		},
	});
	return { isCreating, createBooking };
}
