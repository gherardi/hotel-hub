import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider.jsx';

export default function AdminBookings() {
	const [users, setUsers] = useState([]);
	const jwt = useAuth();

	useEffect(() => {
		const getData = async () => {
			const resp = await fetch('http://localhost:3000/api/albergatori', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await resp.json();
			setUsers(data);
		};
		getData();
	}, [jwt]);

	return (
		<>
			<h2>Utenti</h2>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500'>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>Created at</th>
							<th scope='col'>Nominativo</th>
							<th scope='col'>Email</th>
							<th scope='col'>Ruolo</th>
							<th scope='col'>Hotel</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{users &&
							users.map((user) => {
								return (
									<tr key={user.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{new Date(user.created_at).toLocaleString()}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.is_admin ? 'Amministratore' : 'Utente'}</td>
										<td>{user.hotel.name}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
