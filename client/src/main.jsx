import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from './components/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LoadingPage from './pages/Loading.page.jsx';
import ErrorPage from './pages/Error.page.jsx';
import Wrapper from './pages/Wrapper.page.jsx';

const LoginPage = lazy(() => import('./pages/Login.page.jsx'));
const HomePage = lazy(() => import('./pages/Home.page.jsx'));
const SignupPage = lazy(() => import('./pages/Signup.page.jsx'));
const DashboardPage = lazy(() => import('./pages/Dashboard.page.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound.page.jsx'));

// complete react router tutorial by cosden solutions
// https://youtu.be/oTIJunBa6MA?feature=shared

const routeConfigurations = [
	{ path: '/', element: <HomePage /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/signup', element: <SignupPage /> },

	{ path: '/dashboard', element: <DashboardPage />, protected: true },

	{ path: '/*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(
	routeConfigurations.map((route) => ({
		path: route.path,
		element: (
			<Suspense fallback={<LoadingPage />}>
				{route.protected ? ( //
					<AuthProvider>
						<ProtectedRoute>{route.element}</ProtectedRoute>
					</AuthProvider>
				) : (
					route.element
				)}
			</Suspense>
		),
		errorElement: <ErrorPage />,
	}))
);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Wrapper>
			{/* <AuthProvider> */}
			<RouterProvider router={router} />
			{/* </AuthProvider> */}
		</Wrapper>
	</React.StrictMode>
);
