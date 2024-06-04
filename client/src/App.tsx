import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import components
import Loader from './components/ui/loading';
import ProtectedRoute from './components/protected-route';

// Import styles
import './index.css';

// Lazy load public routes
const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const NotFound = lazy(() => import('@/pages/not-found'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));

const Dashboard = lazy(() => import('@/pages/dashboard'));
const Bookings = lazy(() => import('@/pages/bookings'));
const Rooms = lazy(() => import('@/pages/rooms'));
const Settings = lazy(() => import('@/pages/settings'));

// Define routes array
const routes: { path: string; element: JSX.Element; requiresAuth: boolean }[] =
	[
		{ path: '/', element: <Landing />, requiresAuth: false },
		{ path: '/login', element: <Login />, requiresAuth: false },
		{ path: '/signup', element: <Signup />, requiresAuth: false },
		{
			path: '/forgot-password',
			element: <>forgot password</>,
			requiresAuth: false,
		},
		{
			path: '/reset-password/:token',
			element: <ResetPassword />,
			requiresAuth: false,
		},

		{ path: '/settings', element: <Settings />, requiresAuth: true },
		{ path: '/dashboard', element: <Dashboard />, requiresAuth: true },
		{ path: '/bookings', element: <Bookings />, requiresAuth: true },
		{ path: '/rooms', element: <Rooms />, requiresAuth: true },

		{ path: '*', element: <NotFound />, requiresAuth: false },
	];

function App() {
	return (
		<>
			<Suspense
				fallback={
					<div className='h-svh w-full grid place-items-center'>
						<Loader />
					</div>
				}
			>
				<Routes>
					{routes.map(({ path, element, requiresAuth }) => (
						<Route
							key={path}
							path={path}
							element={
								requiresAuth ? (
									<ProtectedRoute>{element}</ProtectedRoute>
								) : (
									element
								)
							}
						/>
					))}
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
