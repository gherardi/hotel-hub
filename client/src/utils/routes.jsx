import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AuthProvider from '../components/AuthProvider.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

import LoadingPage from '../pages/Loading.page.jsx';
import ErrorPage from '../pages/Error.page.jsx';

const Landing = lazy(() => import('../pages/Landing.page.jsx'));
const Signup = lazy(() => import('../pages/Signup.page.jsx'));
const Login = lazy(() => import('../pages/Login.page.jsx'));
const User = lazy(() => import('../pages/User.page.jsx'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.page.jsx'));
const ResetPassword = lazy(() => import('../pages/ResetPassword.page.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.page.jsx'));

const routeConfigurations = [
	{ path: '/', element: <Landing /> },
	{ path: '/signup', element: <Signup /> },
	{ path: '/login', element: <Login /> },
	{
		path: '/dashboard',
		element: <User />,
		protected: true,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/reset-password/:token',
		element: <ResetPassword />,
	},
	{ path: '/*', element: <NotFound /> },
];

const router = createBrowserRouter(
	routeConfigurations.map((route) => ({
		path: route.path,
		element: (
			<Suspense fallback={<LoadingPage />}>
				{route.protected ? (
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

export default router;
