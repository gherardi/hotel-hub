import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

export default function ProtectedRoute({ children }) {
	const user = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user === null || user === undefined) {
			navigate('/', { replace: true });
		}
	}, [navigate, user]);

	return children;
}
