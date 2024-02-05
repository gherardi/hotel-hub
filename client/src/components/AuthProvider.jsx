import { createContext, useContext, useState } from 'react';
import useApi from '../hooks/useApi.jsx';
import ServerErrorPage from '../pages/ServerErrorPage.jsx';
import LoadingPage from '../pages/LoadingPage.jsx';

const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
	const { isLoading, error } = useApi('https://jsonplaceholder.typicode.com/posts/1');
	// const { isLoading, error } = useApi('/server-status');

	const [user] = useState(isSignedIn ? { id: 1, username: 'user' } : null);

	if (error) return <ServerErrorPage error={error} />;

	if (isLoading) return <LoadingPage />;

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
