import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import router from '@/routes/router';

const queryClient = new QueryClient();

export default function App() {
	return (
		<ThemeProvider defaultTheme='system' storageKey='ui-theme'>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}

				<RouterProvider router={router} />
				<Toaster />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
