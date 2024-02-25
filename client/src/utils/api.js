import axios from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from './config.js';

const API = axios.create({
	baseURL: BACKEND_URL,
	timeout: REQUEST_TIMEOUT,
});

export default API;

// try {
//   const res = await API.get('/api/albergatori/me');
//   console.log(res.data);
// } catch (error) {
//   console.error('Error in API request:', error.message);
// }
