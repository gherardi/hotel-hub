import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '@/services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function useLogin() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isPending: isLoading } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			loginApi({ email, password }),
		onSuccess: (user) => {
			queryClient.setQueryData(['user'], (user as any).user);
			navigate('/bookings', { replace: true });
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Errore di autenticazione',
				description:
					error.message || "Si è verificato un errore durante l'autenticazione",
			});
		},
	});

	return { login, isLoading };
}
