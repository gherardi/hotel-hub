import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider.jsx';
import { Trash2 } from 'lucide-react';

export default function HotelsView() {
	const [hotels, setHotels] = useState([]);
	const jwt = useAuth();

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/albergatori/hotels', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await resp.json();
			setHotels(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Hotel</h2>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Created at</th>
							<th scope='col'>Nome</th>
							<th scope='col'>Dipendenti</th>
							<th scope='col'>Identificativo</th>
							<th scope='col'>Elimina</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{hotels &&
							hotels.map((hotel) => {
								return (
									<tr key={hotel.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{new Date(hotel.created_at).toLocaleString()}</td>
										<td className='font-medium'>{hotel.name}</td>
										<td>{hotel.users.length}</td>
										<td>{hotel.id}</td>
										<td>
											<button
												type='button'
												className='px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200'
												onClick={async () => {
													const resp = await fetch(
														`http://localhost:3000/api/albergatori/hotels/${hotel.id}`,
														{
															method: 'DELETE',
															headers: {
																Authorization: `Bearer ${jwt}`,
															},
														}
													);
													const data = await resp.json();
													if (data.status === 'success') {
														setHotels((prev) =>
															prev.filter((u) => u.id !== hotel.id)
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
