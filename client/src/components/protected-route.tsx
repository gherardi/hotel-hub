import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/components/auth-provider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	// const user = useAuth();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	if (user === null) {
	// 		navigate('/login', { replace: true });
	// 	}
	// }, [navigate, user]);

	const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
