import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import routes from '@/routes';
import { supabase } from '@/database/supabase-client';
import { useSessionStore } from '@/stores/session-store';
import ProtectedRoute from '@/components/auth/protected-route';
import Layout from '@/layouts/Layout';

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
					{routes.public.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}

					<Route
						element={
							<ProtectedRoute>
								<Layout />
							</ProtectedRoute>
						}
					>
						{routes.protected.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
						))}
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	);
}
