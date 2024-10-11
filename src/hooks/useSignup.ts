import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '@/services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function useSignup() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const { mutate: signup, isPending: isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: () => {
			toast({
				title: 'Link di conferma inviato alla tua mail',
				description:
					'Controlla la tua casella di posta e conferma la registrazione',
			});
			navigate('/login');
		},
		onError: (error) => {
			toast({
				variant: 'destructive',
				title: 'Errore durante la registrazione',
				description:
					error.message || "Si è verificato un errore durante l'autenticazione",
			});
		},
	});

	return { signup, isLoading };
}
