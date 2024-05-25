import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider.tsx';
import AuthProvider from '@/components/auth-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
);
