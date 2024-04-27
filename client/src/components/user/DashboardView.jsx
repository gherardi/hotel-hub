// import { useState, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useAuth } from '../AuthProvider.jsx';

export default function DashboardView() {
	const jwt = useAuth();

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const resp = await fetch(
	// 			'http://localhost:3000/api/albergatori/dashboard',
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${jwt}`,
	// 				},
	// 			}
	// 		);
	// 		const data = await resp.json();
	// 		setData(data);
	// 	};
	// 	getData();
	// }, [jwt]);

	const fetchData = (url) => {
		return async () => {
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await res.json();
			return data;
		};
	};

	// FETCHING DASHBOARD DATA
	// const {
	// 	data: prenotazioni,
	// isError,
	// error,
	// isFetching,
	// } = useQuery({
	// 	queryFn: async () => {
	// 		const res = await fetch('http://localhost:3000/api/bookings', {
	// 			headers: {
	// 				Authorization: `Bearer ${jwt}`,
	// 			},
	// 		});
	// 		const resData = await res.json();
	// 		return resData;
	// 	},
	// 	queryKey: ['dashboard'],
	// });

	const [bookings, rooms] = useQueries({
		queries: [
			{
				queryKey: ['bookings'],
				queryFn: fetchData('http://localhost:3000/api/bookings'),
			},
			{
				queryKey: ['rooms'],
				queryFn: fetchData('http://localhost:3000/api/rooms'),
			},
		],
	});
	console.log(rooms);

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Dashboard</h2>
			</div>

			<div className='py-8 font-semibold text-center text-white bg-red-600'>
				IN PROGRESS
			</div>

			<div className='grid gap-4 lg:grid-cols-3 [&>*]:bg-background-hover'>
				<div className='p-4 rounded'>
					<h4 className='mb-2 text-sm'>Prenotazioni</h4>
					<div className='text-2xl font-bold'>
						{bookings.isFetching ? '...' : bookings.data.length}
					</div>
				</div>
				<div className='p-4 rounded'>
					<h4 className='mb-2 text-sm'>Vendite</h4>
					<div className='text-2xl font-bold'>
						{bookings.isFetching
							? '...'
							: `${bookings.data.reduce((acc, next) => acc + next.total, 0)}€`}
					</div>
				</div>
				<div className='p-4 rounded'>
					<h4 className='mb-2 text-sm'>Tasso di occupazione</h4>
					<div className='text-2xl font-bold'>7%</div>
				</div>
			</div>

			{/* <div className='grid lg:grid-cols-2 mt-6 gap-6 [&>*]:bg-background-hover/50 [&>*]:rounded-md'>
				<div className='px-6 py-4'>
					<h4 className='text-lg font-medium semibold'>
						Riepilogo prenotazioni
					</h4>
					<hr className='mt-2 border-[1.5px]' />
					<div className='divide-y-2'>
						{data?.prenotazioni &&
							data?.prenotazioni?.slice(0, 5).map((prenotazione) => (
								<div
									key={prenotazione.id}
									className='flex items-center gap-3 py-4'
								>
									<div className='px-4 pt-[2px] pb-[3px] text-nowrap uppercase text-xs font-semibold rounded-full bg-[#E0F2FE] text-blue-900'>
										in arrivo
										{/* bg-[#DCFCE7] text-green-900
									</div>
									<div className='font-medium'>
										{prenotazione.customer_name}
									</div>
									<div className='ml-auto'>
										{prenotazione.nights}
										{prenotazione.nights === 1 ? ' notte' : ' notti'}
									</div>
								</div>
							))}
					</div>
				</div>
			</div> */}
		</>
	);
}
