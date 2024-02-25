// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider.jsx';

import LoadingPage from '../pages/Loading.page.jsx';
import AdminPage from '../pages/Admin.page.jsx';
import { useEffect, useState } from 'react';
import API from '../utils/api.js';

export default function ProtectedRoute({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: response } = await API.get('/api/albergatori/me', {
					headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
				});

				if (response.data.is_admin) setIsAdmin(true);
				setIsLoading(false);
			} catch (err) {
				console.log('Error in API request:', err.response.data.message);
			}
		};

		fetchData();
	}, []);

	return isLoading ? <LoadingPage /> : isAdmin ? <AdminPage /> : children;
}
