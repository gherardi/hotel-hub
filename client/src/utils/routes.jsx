import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// const LandingPage = lazy(() => import('../pages/Landing.page.jsx'));

// const SignupPage = lazy(() => import('../pages/Signup.page.jsx'));
// const LoginPage = lazy(() => import('../pages/Login.page.jsx'));

// const DashboardPage = lazy(() => import('../pages/Dashboard.page.jsx'));

// const ForgotPasswordPage = lazy(() =>
// 	import('../pages/ForgotPassword.page.jsx')
// );
// const ResetPasswordPage = lazy(() => import('../pages/ResetPassword.page.jsx'));
// const NotFoundPage = lazy(() => import('../pages/NotFound.page.jsx'));

// const routeConfigurations = [
// 	{ path: '/', element: <LandingPage /> },
// 	{ path: '/signup', element: <SignupPage /> },
// 	{ path: '/login', element: <LoginPage /> },

// 	{ path: '/dashboard', element: <DashboardPage />, protected: true },

// 	{ path: '/forgot-password', element: <ForgotPasswordPage /> },
// 	{ path: '/reset-password/:token', element: <ResetPasswordPage /> },

// 	{ path: '/*', element: <NotFoundPage /> },
// ];

import AuthProvider from '../components/AuthProvider.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

import LoadingPage from '../pages/Loading.page.jsx';
import ErrorPage from '../pages/Error.page.jsx';

const Landing = lazy(() => import('../pages/Landing.page.jsx'));
const Signup = lazy(() => import('../pages/Signup.page.jsx'));
const Login = lazy(() => import('../pages/Login.page.jsx'));
const Dashboard = lazy(() => import('../pages/Dashboard.page.jsx'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.page.jsx'));
const ResetPassword = lazy(() => import('../pages/ResetPassword.page.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.page.jsx'));

const routeConfigurations = [
	{ path: '/', element: <Landing /> },
	{ path: '/signup', element: <Signup /> },
	{ path: '/login', element: <Login /> },
	{
		path: '/dashboard',
		element: <Dashboard />,
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
