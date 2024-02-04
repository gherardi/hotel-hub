import { useState, useEffect } from 'react';
import axios from 'axios';
import { REQUEST_TIMEOUT } from '../utils/config.js';

export default function useApi(url, method = 'get', initialData = null) {
	const [data, setData] = useState(initialData);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await axios({
					method,
					url,
					signal: AbortSignal.timeout(REQUEST_TIMEOUT)
				});
				setData(response.data);
			} catch (error) {
				// Se l'errore è causato dalla cancellazione, non impostare lo stato di errore
				if (error.name === 'CanceledError' || error.name === 'AbortError') {
					setError("Request took too long to complete. Please try again.");
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
