import Sidebar from '../components/ui/Sidebar.jsx';
import { useEffect, useState } from 'react';

import RoomsPage from './Rooms.page.jsx';
import BookingsPage from './Bookings.page.jsx';
import ProfilePage from './Profile.page.jsx';

import { useAuth } from '../components/AuthProvider.jsx';

export default function DashboardPage() {
	const [view, setView] = useState('bookings');

	return (
		<div className='flex h-full'>
			<Sidebar setView={setView} />

			<div className='w-[84vw] h-full'>
				<div className='h-full text-content/80 px-5 pt-12 mx-auto overflow-y-auto lg:w-11/12 [&>h2]:text-3xl [&>h2]:pb-8 [&>h2]:font-bold'>
					{view === 'dashboard' && <Dashboard />}
					{view === 'bookings' && <BookingsPage />}
					{view === 'rooms' && <RoomsPage />}
					{view === 'profile' && <ProfilePage />}
				</div>
			</div>
		</div>
	);
}

function Dashboard() {
	const jwt = useAuth();
	const [data, setData] = useState({});

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/albergatori/dashboard', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const data = await resp.json();
			setData(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Dashboard</h2>
			<div className='grid lg:grid-cols-3 gap-6 [&>*]:rounded-md [&>*]:bg-background-hover/50 [&>*]:uppercase [&>*]:px-6 [&>*]:py-4'>
				<div className=''>
					<h4 className='text-sm'>Prenotazioni</h4>
					<div className='pt-1 text-2xl font-bold lg:pt-3 lg:text-4xl'>
						{data?.prenotazioni?.length ?? 0}
					</div>
				</div>
				<div className=''>
					<h4 className='text-sm'>Vendite</h4>
					<div className='pt-1 text-2xl font-bold lg:pt-3 lg:text-4xl'>
						{data?.vendite?.toFixed(0) ?? 0}€
					</div>
				</div>
				<div className=''>
					<h4 className='text-sm'>Tasso di occupazione</h4>
					<div className='pt-1 text-2xl font-bold lg:pt-3 lg:text-4xl'>
						{data?.tassoOccupazione?.toFixed(0) ?? 0}%
					</div>
				</div>
			</div>
			<div className='grid lg:grid-cols-2 mt-6 gap-6 [&>*]:bg-background-hover/50 [&>*]:rounded-md'>
				<div className='px-6 py-4'>
					<h4 className='text-lg font-medium semibold'>Riepilogo prenotazioni</h4>
					<hr className='mt-2 border-[1.5px]' />
					<div className='divide-y-2'>
						{data?.prenotazioni &&
							data?.prenotazioni?.slice(0, 5).map((prenotazione) => (
								<div key={prenotazione.id} className='flex items-center gap-3 py-4'>
									<div className='px-4 pt-[2px] pb-[3px] text-nowrap uppercase text-xs font-semibold rounded-full bg-[#E0F2FE] text-blue-900'>
										in arrivo
										{/* bg-[#DCFCE7] text-green-900 */}
									</div>
									<div className='font-medium'>{prenotazione.customer_name}</div>
									<div className='ml-auto'>
										{prenotazione.nights}
										{prenotazione.nights === 1 ? ' notte' : ' notti'}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
