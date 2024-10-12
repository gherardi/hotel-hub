import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRoom as createRoomApi } from '@/services/apiRooms';
import { useToast } from '@/hooks/use-toast';

export function useCreateRoom() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: createRoom, isPending: isCreating } = useMutation({
		mutationFn: createRoomApi,
		onSuccess: () => {
			toast({
				title: 'Camera creata con successo',
				description: '',
			});
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Errore durante la creazione della camera',
				description: error.message || '',
			});
		},
	});
	return { isCreating, createRoom };
}
