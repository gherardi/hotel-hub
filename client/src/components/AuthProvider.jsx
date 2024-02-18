import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	// const [user] = useState(isSignedIn ? { id: 1, username: 'user' } : null);

	// const user = { uuid: crypto.randomUUID() };
	const [user] = useState({ uuid: '1234' });

	useEffect(() => {}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
