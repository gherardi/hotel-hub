import { useState } from 'react';
import AdminSidebar from '../components/ui/AdminSidebar.jsx';
import AdminUsers from '../components/ui/AdminUsers.jsx';
import AdminBookings from '../components/ui/AdminBookings.jsx';
import AdminHotels from '../components/ui/AdminHotels.jsx';
import AdminRooms from '../components/ui/AdminRooms.jsx';

export default function AdminPage() {
	const [view, setView] = useState('users');

	return (
		<div className='flex h-full'>
			<AdminSidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full text-content/80 px-5 pt-12 mx-auto overflow-y-auto lg:w-11/12 [&>h2]:text-3xl [&>h2]:pb-8 [&>h2]:font-bold'>
					{/* {view === 'users' && <Dashboard />}
					{view === 'bookings' && <AllBookings />}
					{view === 'rooms' && <RoomsPage />}
					{view === 'profile' && <ProfilePage />} */}
					{view === 'users' && <AdminUsers />}
					{view === 'bookings' && <AdminBookings />}
					{view === 'rooms' && <AdminRooms />}
					{view === 'hotels' && <AdminHotels />}
				</div>
			</div>
		</div>
	);
}
