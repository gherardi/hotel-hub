import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

import AuthProvider from './components/AuthProvider.jsx';
import ProtectedPage from './pages/ProtectedPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

// import { lazy } from "react";
// const ReportedPost = lazy(() => import("./pages/ReportedPost"));


// complete react router tutorial by cosden solutions
// https://youtu.be/oTIJunBa6MA?feature=shared
const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/signup',
		element: <SignUpPage />,
	},
	{
		path: '/protect',
		element: (
			<ProtectedRoute>
				<ProtectedPage />
			</ProtectedRoute>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider isSignedIn={false}>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
