import { createContext, useContext, useState } from 'react';
import ServerStatusChecker from './ServerStatusChecker';

const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
	const [user] = useState(isSignedIn ? { id: 1, username: 'user' } : null);

	return (
		<ServerStatusChecker>
			<AuthContext.Provider value={user}>{children}</AuthContext.Provider>
		</ServerStatusChecker>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
