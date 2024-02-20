import Sidebar from '../components/ui/Sidebar.jsx';
// import { useAuth } from '../components/AuthProvider';

export default function DashboardPage() {
	// const token = useAuth();

	// console.log(token);

	return (
		<>
			<div className='grid grid-cols-5'>
				<Sidebar />
				<div className='col-span-4 bg-red-400'>ciao</div>
			</div>
		</>
	);
}
