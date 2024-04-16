import { useState, useEffect } from 'react';
import API from '../utils/api.js';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../utils/config.js';

function useApi({ method = 'get', url, body }) {
	const [data, setData] = useState();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await API({
					method,
					url: BACKEND_URL + url,
					// signal: AbortSignal.timeout(REQUEST_TIMEOUT),
				});

				setData(response.data);
			} catch (error) {
				// Se l'errore è causato dalla cancellazione, non impostare lo stato di errore
				if (error.name === 'CanceledError' || error.name === 'AbortError') {
					setError('Request took too long to complete. Please try again.');
				}

				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, method]);

	return { data, error, isLoading };
}
