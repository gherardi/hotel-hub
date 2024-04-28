// import axios from 'axios';
// import { BACKEND_URL, REQUEST_TIMEOUT } from './config.js';

// const API = axios.create({
// 	baseURL: BACKEND_URL,
// 	timeout: REQUEST_TIMEOUT,
// });

// export default API;

// try {
//   const res = await API.get('/api/albergatori/me');
//   console.log(res.data);
// } catch (error) {
//   console.error('Error in API request:', error.message);
// }

import { useAuth } from '../components/AuthProvider';

export default function fetchData(url){
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const jwt = useAuth();
	return async () => {
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		if(!res.ok) throw new Error('Errore nel recupero dei dati');

		const resData = await res.json();
		if (resData.status !== 'success') throw new Error(resData.message);
		
		return resData.data;
	};
}
