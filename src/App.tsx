import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { routes } from '@/routes';
import { supabase } from '@/database/supabase-client';
import { useSessionStore } from '@/stores/session-store';
import ProtectedRoute from '@/components/auth/protected-route';

export default function App() {
	const setSession = useSessionStore((state) => state.setSession);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<ThemeProvider defaultTheme='system' storageKey='ui-theme'>
			<BrowserRouter>
				<Routes>
					{routes.map(({ path, element, requiresAuth }) => (
						<Route
							key={path}
							path={path}
							element={
								requiresAuth ? (
									<ProtectedRoute>{element}</ProtectedRoute>
								) : (
									element
								)
							}
						/>
					))}
				</Routes>
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	);
}
