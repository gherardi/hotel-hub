import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import AdminPage from '../pages/Admin.page.jsx';
import LoadingPage from '../pages/Loading.page.jsx';
import { useAuth } from './AuthProvider.jsx';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const jwt = useAuth();

	if (!jwt) navigate('/login', { replace: true });

	const { data, isLoading, isError } = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/users/me', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const resData = await res.json();
			return resData;
		},
		queryKey: [],
	});

	if (isError) return navigate('/login', { replace: true });

	if (isLoading) return <LoadingPage />;

	if (data.status !== 'success') return navigate('/login', { replace: true });

	if (data.data.is_admin) return <AdminPage />;

	return children;
}
