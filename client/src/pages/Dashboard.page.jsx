import Sidebar from '../components/ui/Sidebar.jsx';
// import { useAuth } from '../components/AuthProvider';

export default function DashboardPage() {
	// const token = useAuth();

	// console.log(token);

	return (
		<div className='grid h-full grid-cols-5'>
			<Sidebar />
			<div className='col-span-4'>ciao</div>
		</div>
	);
}
