import { useState } from 'react';
import AdminSidebar from '../components/admin/Sidebar.jsx';
import UsersView from '../components/admin/UsersView.jsx';
import HotelsView from '../components/admin/HotelsView.jsx';
import ProfileView from '../components/admin/ProfileView.jsx';

export default function AdminPage() {
	const [view, setView] = useState('profile');

	return (
		<div className='flex h-full'>
			<AdminSidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full px-5 pt-12 mx-auto overflow-y-auto text-content/80 lg:w-11/12'>
					{view === 'users' && <UsersView />}
					{view === 'hotels' && <HotelsView />}
					{view === 'profile' && <ProfileView />}
				</div>
			</div>
		</div>
	);
}
