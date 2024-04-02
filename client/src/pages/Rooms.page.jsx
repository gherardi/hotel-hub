import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider.jsx';
import { Trash2 } from 'lucide-react';

// import CreateRoomsButton from '../components/ui/CreateRoomsButton.jsx';

export default function RoomsPage() {
	const [rooms, setRooms] = useState([]);
	const jwt = useAuth();

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/camere', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await resp.json();
			data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			setRooms(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Rooms</h2>
			{/* <CreateRoomsButton /> */}

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Created at</th>
							<th scope='col'>tipo</th>
							<th scope='col'>prezzo a notte</th>
							<th scope='col'>numero</th>
							<th scope='col'>hotel</th>
							<th scope='col'>Elimina</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{rooms &&
							rooms.map((room) => {
								return (
									<tr key={room.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{new Date(room.created_at).toLocaleString()}</td>
										<td>{room.type}</td>
										<td>{room.price}€</td>
										<td>{room.number}</td>
										<td>{room.hotel.name}</td>
										<td>
											<button
												type='button'
												className='px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200'
												onClick={async () => {
													const resp = await fetch(
														`http://localhost:3000/api/camere/${room.id}`,
														{
															method: 'DELETE',
															headers: {
																Authorization: `Bearer ${jwt}`,
															},
														}
													);
													const data = await resp.json();
													if (data.status === 'success') {
														setRooms((prev) => prev.filter((u) => u.id !== room.id));
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
