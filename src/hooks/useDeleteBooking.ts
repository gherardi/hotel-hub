import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBooking as deleteBookingApi } from '@/services/apiBookings';
import { useToast } from '@/hooks/use-toast';

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			toast({
				title: 'Prenotazione eliminata',
				description: 'La prenotazione è stata eliminata con successo.',
			});
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Errore',
				description:
					error.message ||
					"Si è verificato un errore durante l'eliminazione della prenotazione.",
			});
		},
	});
	return { isDeleting, deleteBooking };
}
