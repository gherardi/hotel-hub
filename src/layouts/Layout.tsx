import { Outlet, useNavigation } from 'react-router-dom';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import Loader from '@/pages/Loader';

export default function Dashboard() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className='grid h-svh w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Header />
				{isLoading ? <Loader /> : <Outlet />}
			</div>
		</div>
	);
}
