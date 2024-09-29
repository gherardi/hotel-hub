import Landing from '@/pages/landing';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import Dashboard from '@/pages/dashboard';
import Bookings from '@/pages/bookings';
import Rooms from '@/pages/rooms';
import Settings from '@/pages/settings';

type Route = {
	path: string;
	element: JSX.Element;
	requiresAuth: boolean;
};

export const routes: Route[] = [
	{ path: '/', element: <Landing />, requiresAuth: false },
	{ path: '/login', element: <Login />, requiresAuth: false },
	{ path: '/signup', element: <Signup />, requiresAuth: false },

	{ path: '/dashboard', element: <Dashboard />, requiresAuth: true },
	{ path: '/bookings', element: <Bookings />, requiresAuth: true },
	{ path: '/rooms', element: <Rooms />, requiresAuth: true },
	{ path: '/settings', element: <Settings />, requiresAuth: true },

	{
		path: '*',
		element: (
			<div className='flex items-center justify-center h-svh'>
				page not found
			</div>
		),
		requiresAuth: false,
	},
];
