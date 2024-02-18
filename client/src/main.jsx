import React from 'react';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from './components/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LoadingPage from './pages/Loading.page.jsx';

const LoginPage = lazy(() => import('./pages/Login.page.jsx'));
const HomePage = lazy(() => import('./pages/Home.page.jsx'));
const SignUpPage = lazy(() => import('./pages/Signup.page.jsx'));
const DashboardPage = lazy(() => import('./pages/Dashboard.page.jsx'));

const NotFoundPage = lazy(() => import('./pages/NotFound.page.jsx'));

// complete react router tutorial by cosden solutions
// https://youtu.be/oTIJunBa6MA?feature=shared
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoadingPage />}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<LoadingPage />}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: '/signup',
		element: (
			<Suspense fallback={<LoadingPage />}>
				<SignUpPage />
			</Suspense>
		),
	},
	{
		path: '/dashboard',
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ProtectedRoute>
					<DashboardPage />
				</ProtectedRoute>
			</Suspense>
		),
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<LoadingPage />}>
				<NotFoundPage />
			</Suspense>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
