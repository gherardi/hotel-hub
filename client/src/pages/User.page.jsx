import { useState } from 'react';

import UserSidebar from '../components/user/Sidebar.jsx';
import DashboardView from '../components/user/DashboardView.jsx';
import RoomsView from '../components/user/RoomsView.jsx';
import BookingsView from '../components/user/BookingsView.jsx';
import ProfileView from '../components/user/ProfileView.jsx';

export default function DashboardPage() {
	const [view, setView] = useState('bookings');

	return (
		<div className='flex h-full'>
			<UserSidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full px-5 pt-12 mx-auto overflow-y-auto text-content/80 lg:w-11/12'>
					{view === 'dashboard' && <DashboardView />}
					{view === 'bookings' && <BookingsView />}
					{view === 'rooms' && <RoomsView />}
					{view === 'profile' && <ProfileView />}
				</div>
			</div>
		</div>
	);
}
