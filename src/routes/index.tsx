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
};

type Routes = {
	public: Route[];
	protected: Route[];
};

const routes: Routes = {
	public: [
		{ path: '/', element: <Landing /> },
		{ path: '/login', element: <Login /> },
		{ path: '/signup', element: <Signup /> },
	],
	protected: [
		{ path: '/dashboard', element: <Dashboard /> },
		{ path: '/bookings', element: <Bookings /> },
		{ path: '/rooms', element: <Rooms /> },
		{ path: '/settings', element: <Settings /> },
	],
};

export default routes;
