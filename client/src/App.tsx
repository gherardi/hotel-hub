import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/ui/loading';

const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/login'));

const NotFound = lazy(() => import('@/pages/notfound'));

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
						{/* <Route path='/signup' element={<Landing />} /> */}
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
