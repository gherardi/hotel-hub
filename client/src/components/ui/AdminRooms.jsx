import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider.jsx';

export default function AdminRooms() {
	const [rooms, setRooms] = useState([]);
	const jwt = useAuth();

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/camere/all', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await resp.json();
			setRooms(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Camere</h2>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Created at</th>
							<th scope='col'>tipo</th>
							<th scope='col'>prezzo</th>
							<th scope='col'>numero</th>
							<th scope='col'>hotel</th>
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
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
