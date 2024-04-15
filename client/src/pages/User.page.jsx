import Sidebar from '../components/ui/Sidebar.jsx';
import { useState } from 'react';

import DashboardView from '../components/user/DashboardView.jsx';
import RoomsView from '../components/user/RoomsView.jsx';
import BookingsView from '../components/user/BookingsView.jsx';
import ProfileView from '../components/user/ProfileView.jsx';

export default function DashboardPage() {
	const [view, setView] = useState('dashboard');

	return (
		<div className='flex h-full'>
			<Sidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full text-content/80 px-5 pt-12 mx-auto overflow-y-auto lg:w-11/12 [&>h2]:text-3xl [&>h2]:pb-8 [&>h2]:font-bold'>
					{view === 'dashboard' && <DashboardView />}
					{view === 'bookings' && <BookingsView />}
					{view === 'rooms' && <RoomsView />}
					{view === 'profile' && <ProfileView />}
				</div>
			</div>
		</div>
	);
}
