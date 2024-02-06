import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

import ErrorPage from '../pages/ErrorPage';
import LoadingPage from '../pages/LoadingPage';

export default function ServerStatusChecker({ children }) {
	const { isLoading, error } = useApi('https://jsonplaceholder.typicode.com/posts/1');
	const [isServerOnline, setServerOnline] = useState(true);

	useEffect(() => {
		if (error) {
			setServerOnline(false);
		}
	}, [error]);

	if (!isServerOnline) return <ErrorPage error={error} />;

	if (isLoading) return <LoadingPage />;

	return <>{children}</>;
}
