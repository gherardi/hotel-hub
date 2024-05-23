import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/ui/loading';

// PUBLIC ROUTES
const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const NotFound = lazy(() => import('@/pages/notfound'));

// PRIVATE ROUTES
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Dashboard2 = lazy(() => import('@/pages/dashboard2'));

import './index.css';

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
					<Route path='/'>
						<Route path='/' element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/dashboard2' element={<Dashboard2 />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
