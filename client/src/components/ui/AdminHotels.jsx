import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider.jsx';

export default function AdminHotels() {
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
			<h2>Hotel registrati</h2>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Created at</th>
							<th scope='col'>Nome</th>
							<th scope='col'>Dipendenti</th>
							<th scope='col'>Identificativo</th>
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
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
