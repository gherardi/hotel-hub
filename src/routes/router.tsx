import { createBrowserRouter } from 'react-router-dom';

import Landing from '@/pages/landing';
import Login from '@/pages/login';
import Signup from '@/pages/signup';

import ProtectedRoute from '@/components/auth/protected-route';
import Layout from '@/layouts/Layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'signup',
		element: <Signup />,
	},
	{
		path: '*',
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: 'dashboard',
				async lazy() {
					const { Dashboard } = await import('@/pages/dashboard');
					return { Component: Dashboard };
				},
			},
			{
				path: 'bookings',
				async lazy() {
					const { Bookings } = await import('@/pages/bookings');
					return { Component: Bookings };
				},
			},
			{
				path: 'rooms',
				async lazy() {
					const { Rooms } = await import('@/pages/rooms');
					return { Component: Rooms };
				},
			},
			{
				path: 'settings',
				async lazy() {
					const { Settings } = await import('@/pages/settings');
					return { Component: Settings };
				},
			},
		],
	},
]);

export default router;
