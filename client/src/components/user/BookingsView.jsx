import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider.jsx';
import { Trash2 } from 'lucide-react';

import CreateBookingsButton from '../ui/CreateBookingsButton.jsx';

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
			data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			setBookings(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Bookings</h2>
			<CreateBookingsButton />

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
							<th scope='col'>Elimina</th>
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
										<td>
											<button
												type='button'
												className='px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200'
												onClick={async () => {
													const resp = await fetch(
														`http://localhost:3000/api/prenotazioni/${booking.id}`,
														{
															method: 'DELETE',
															headers: {
																Authorization: `Bearer ${jwt}`,
															},
														}
													);
													const data = await resp.json();
													if (data.status === 'success') {
														setBookings((prev) =>
															prev.filter((u) => u.id !== booking.id)
														);
													}
												}}
											>
												<Trash2 size={16} />
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
