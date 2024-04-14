import { createContext, useContext } from 'react';
// import useLocaleStorage from '../hooks/useLocalStorage.jsx';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	const token = localStorage.getItem('token');

	return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
