import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider.jsx';

export default function BookingsPage() {
	const [bookings, setBookings] = useState([]);
	const jwt = useAuth();

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/prenotazioni', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await resp.json();
			setBookings(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Bookings</h2>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Nominativo</th>
							<th scope='col'>Created at</th>
							<th scope='col'>arrivo</th>
							<th scope='col'>partenza</th>
							<th scope='col'>notti</th>
							<th scope='col'>totale</th>
							<th scope='col'>n. camera</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{bookings &&
							bookings.map((booking) => {
								return (
									<tr key={booking.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td className='font-medium'>{booking.customer_name}</td>
										<td>{new Date(booking.created_at).toLocaleString()}</td>
										<td>{new Date(booking.start).toLocaleDateString()}</td>
										<td>{new Date(booking.end).toLocaleDateString()}</td>
										<td>{booking.nights}</td>
										<td>{booking.total}€</td>
										<td>{booking.rooms.number}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
