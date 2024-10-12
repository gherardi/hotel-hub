import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import routes from '@/routes';
import ProtectedRoute from '@/components/auth/protected-route';
import Layout from '@/layouts/Layout';

const queryClient = new QueryClient();

export default function App() {
	return (
		<ThemeProvider defaultTheme='system' storageKey='ui-theme'>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter>
					<Routes>
						{routes.public.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
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
			</QueryClientProvider>
		</ThemeProvider>
	);
}
