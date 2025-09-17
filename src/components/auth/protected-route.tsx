import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import Loading from './loading';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const navigate = useNavigate();

	const { isLoading, isAuthenticated } = useUser();

	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isAuthenticated, isLoading, navigate]
	);

	if (isLoading) return <Loading />;

	return children;
}
