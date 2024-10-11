import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function Dashboard() {
	return (
		<div className='grid h-svh w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Header />
				<Outlet />
			</div>
		</div>
	);
}
