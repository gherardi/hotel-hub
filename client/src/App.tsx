import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/ui/loading';

// PUBLIC ROUTES
const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const NotFound = lazy(() => import('@/pages/notfound'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));

// PRIVATE ROUTES
// const Dashboard = lazy(() => import('@/pages/dashboard'));
// const Dashboard2 = lazy(() => import('@/pages/dashboard2'));

import './index.css';
import ProtectedRoute from './components/protected-route';

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
					<Route index element={<Landing />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					{/* <Route path='/'>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/dashboard2' element={<Dashboard2 />} />
					</Route> */}
					<Route path='/reset-password/:token' element={<ResetPassword />} />

					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<>private profile</>
							</ProtectedRoute>
						}
					/>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
