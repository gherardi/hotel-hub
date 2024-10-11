import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import Loading from './loading';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const navigate = useNavigate();

	// 1. Load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. If there is NO authenticated user, redirect to the /login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isAuthenticated, isLoading, navigate]
	);

	if (isLoading) return <Loading />;

	return children;

	// const session = useSessionStore((state) => state.session);
	// const setSession = useSessionStore((state) => state.setSession);

	// useEffect(() => {
	// 	const secureRoute = async () => {
	// 		await supabase.auth.getSession().then(({ data: { session } }) => {
	// 			setSession(session);
	// 			if (session === null) {
	// 				window.location.href = '/';
	// 			}
	// 		});
	// 	};

	// 	secureRoute();
	// }, [session]);

	// if (session === null) {
	// 	return <Loading />;
	// }

	// if (session) return children;
}
