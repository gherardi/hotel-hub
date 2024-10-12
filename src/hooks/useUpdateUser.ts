import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '@/services/apiAuth';
import { useToast } from '@/hooks/use-toast';

export function useUpdateUser() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: updateUserApi,
		onSuccess: (user) => {
			toast({
				title: 'Profilo aggiornato con successo',
				description: 'Il tuo profilo è stato aggiornato con successo',
			});
			queryClient.setQueryData(['user'], user);
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: "Errore durante l'aggiornamento del profilo",
				description:
					error.message ||
					"Si è verificato un errore durante l'aggiornamento del profilo",
			});
		},
	});

	return { updateUser, isUpdating };
}
