// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider.jsx';

export default function ProtectedRoute({ children }) {
	// const token = useAuth();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	if (token === null || token === undefined) {
	// 		navigate('/', { replace: true });
	// 	}
	// }, [navigate, token]);

	// todo:
	// fare richiesta al backend per verificare il token sia di un account valido
	// se il token è valido, allora restituire la pagina richiesta, altrimenti reindirizzare alla pagina di login
	// se utente è admin fare return di adminpage
	// usare isLoading per mostrare Loading.page nel mentre

	return children;
}
