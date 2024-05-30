import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider.tsx';
import AuthProvider from '@/components/auth-provider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
				<AuthProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
