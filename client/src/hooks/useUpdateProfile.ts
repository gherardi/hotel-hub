import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import { profileSchema } from '@/pages/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { BASE_URL } from '@/config';

export function useUpdateProfile() {
  const { toast } = useToast();
  const { token } = useAuth();
  const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: z.infer<typeof profileSchema>) => {
			const response = await fetch(`${BASE_URL}/users/me`, {
				method: 'PATCH',
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
		onSuccess: (data) => {
			console.log(data);
			console.log("invalidate queries");
      queryClient.invalidateQueries({
				queryKey: ['profile', 'profilo'],
			});

			toast({
				title: 'Successo',
				description: 'Profilo aggiornato con successo!',
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

	return { mutate, isPending };
}
