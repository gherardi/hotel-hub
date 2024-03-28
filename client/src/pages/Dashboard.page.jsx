import Sidebar from '../components/ui/Sidebar.jsx';
import { useState } from 'react';

import RoomsPage from './Rooms.page.jsx';
import BookingsPage from './Bookings.page.jsx';
import { useAuth } from '../components/AuthProvider.jsx';

export default function DashboardPage() {
	const [view, setView] = useState('dashboard');

	const jwt = useAuth();
	console.log('new-render:', jwt);

	return (
		<div className='flex h-full'>
			<Sidebar view={view} setView={setView} />

			{view === 'dashboard' && <Dashboard />}
			{view === 'bookings' && <BookingsPage />}
			{view === 'rooms' && <RoomsPage />}
		</div>
	);
}

function Dashboard() {
	return <div className='w-full'>Dashboard</div>;
}
