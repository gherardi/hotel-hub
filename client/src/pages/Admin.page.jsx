import { useState } from 'react';
import AdminSidebar from '../components/admin/Sidebar.jsx';
import UsersView from '../components/admin/UsersView.jsx';
import HotelsView from '../components/admin/HotelsView.jsx';

export default function AdminPage() {
	const [view, setView] = useState('users');

	return (
		<div className='flex h-full'>
			<AdminSidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full text-content/80 px-5 pt-12 mx-auto overflow-y-auto lg:w-11/12 [&>h2]:text-3xl [&>h2]:pb-8 [&>h2]:font-bold'>
					{view === 'users' && <UsersView />}
					{view === 'hotels' && <HotelsView />}
				</div>
			</div>
		</div>
	);
}
