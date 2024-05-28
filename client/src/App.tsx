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
const NotFound = lazy(() => import('@/pages/notfound'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Dashboard4 = lazy(() => import('@/pages/dashboard-4'));
const Settings = lazy(() => import('@/pages/settings'));

// Define routes array
const routes: { path: string; element: JSX.Element; requiresAuth: boolean }[] =
	[
		{ path: '/', element: <Landing />, requiresAuth: false },
		{ path: '/login', element: <Login />, requiresAuth: false },
		{ path: '/signup', element: <Signup />, requiresAuth: false },
		{
			path: '/reset-password/:token',
			element: <ResetPassword />,
			requiresAuth: false,
		},

		{ path: '/settings', element: <Settings />, requiresAuth: true },
		{ path: '/dashboard', element: <Dashboard />, requiresAuth: true },
		{ path: '/dashboard-4', element: <Dashboard4 />, requiresAuth: false },
		{ path: '*', element: <NotFound />, requiresAuth: false },
	];

// const Dashboard = lazy(() => import('@/pages/dashboard'));
// const Dashboard2 = lazy(() => import('@/pages/dashboard2'));

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
					{/* <Route path='/'>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/dashboard2' element={<Dashboard2 />} />
					</Route> */}
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
