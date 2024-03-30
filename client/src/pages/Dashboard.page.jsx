import Sidebar from '../components/ui/Sidebar.jsx';
import { useEffect, useState } from 'react';

import RoomsPage from './Rooms.page.jsx';
import BookingsPage from './Bookings.page.jsx';
import { useAuth } from '../components/AuthProvider.jsx';

export default function DashboardPage() {
	const [view, setView] = useState('dashboard');

	return (
		<div className='flex h-full'>
			<Sidebar setView={setView} />

			<div className='w-[80vw]'>
				{view === 'dashboard' && <Dashboard />}
				{view === 'bookings' && <BookingsPage />}
				{view === 'rooms' && <RoomsPage />}
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
		<div className='w-full'>
			<div className='px-6 mx-auto md:w-11/12'>
				<h1 className='py-8 text-3xl font-bold'>Dashboard</h1>
				<div className='grid md:grid-cols-3 gap-6 [&>*]:rounded-md [&>*]:bg-neutral-50 [&>*]:uppercase [&>*]:px-6 [&>*]:py-4'>
					<div className=''>
						<h4 className='text-sm'>Prenotazioni</h4>
						<div className='pt-3 text-4xl font-bold'>{data?.prenotazioni?.length ?? 0}</div>
					</div>
					<div className=''>
						<h4 className='text-sm'>Vendite</h4>
						<div className='pt-3 text-4xl font-bold'>{data?.vendite?.toFixed(0) ?? 0}€</div>
					</div>
					<div className=''>
						<h4 className='text-sm'>Tasso di occupazione</h4>
						<div className='pt-3 text-4xl font-bold'>
							{data?.tassoOccupazione?.toFixed(0) ?? 0}%
						</div>
					</div>
				</div>
				<div className='grid grid-cols-2 mt-6 gap-6 [&>*]:bg-neutral-50 [&>*]:rounded-md'>
					<div className='px-6 py-4'>
						<h4 className='text-xl font-semibold'>Riepilogo prenotazioni</h4>
						<hr className='mt-2 border-[1.5px]' />
						<div className='divide-y-2'>
							{data?.prenotazioni &&
								data?.prenotazioni?.slice(0,5).map((prenotazione) => (
									<div key={prenotazione.id} className='flex items-center gap-3 py-4'>
										<div className='px-4 pt-[2px] pb-[3px] uppercase text-xs font-semibold rounded-full bg-[#E0F2FE] text-blue-900'>
											in arrivo
											{/* bg-[#DCFCE7] text-green-900 */}
										</div>
										<div className=''>{prenotazione.customer_name}</div>
										<div className='ml-auto'>
											{prenotazione.nights > 1
												? prenotazione.nights + ' notti'
												: prenotazione.nights + ' notte'}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
