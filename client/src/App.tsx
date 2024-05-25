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
					
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;

// function App2() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Suspense fallback={<SpinnerFullPage />}>
//           <Routes>
//             <Route index element={<HomePage />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route
//               path="/confirm-email/:emailToken"
//               element={<ConfirmEmail />}
//             />
//             <Route
//               path="/app"
//               element={
//                 <ProtectedRoute>
//                   <CitiesProvider>
//                     <AppLayout />
//                   </CitiesProvider>
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Navigate replace to={"cities"} />} />
//               <Route path="cities" element={<CityList />} />
//               <Route
//                 path="cities/:id"
//                 element={
//                   <ExpensesProvider>
//                     <CityLayout />
//                   </ExpensesProvider>
//                 }
//               >
//                 <Route index element={<Navigate replace to={"info"} />} />
//                 <Route path="info" element={<City />} />
//                 <Route path="edit" element={<EditCityForm />} />
//                 <Route path="expenses" element={<ExpenseList />} />
//                 <Route path="expenses/form" element={<ExpenseForm />} />
//                 <Route path="expenses/:expenseId" element={<Expense />} />
//                 <Route
//                   path="expenses/:expenseId/edit"
//                   element={<EditExpenseForm />}
//                 />
//               </Route>
//               <Route path="countries" element={<CountryList />} />
//               <Route path="countries/:countryName" element={<CityList />} />
//               <Route path="form" element={<Form />} />
//             </Route>
//             <Route path="/app/account" element={<Account />} />
//             <Route path="/admin/home" element={<Admin />} />
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </Suspense>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }
