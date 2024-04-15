import { useAuth } from '../AuthProvider.jsx';
import { Trash2 } from 'lucide-react';

export default function UsersView() {
	const jwt = useAuth();
	// const [users, setUsers] = useState([]);
	const [users, setUsers] = [[], () => {}];

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const resp = await fetch('http://localhost:3000/api/albergatori', {
	// 			headers: {
	// 				Authorization: `Bearer ${jwt}`,
	// 			},
	// 		});
	// 		const { data } = await resp.json();
	// 		setUsers(data);
	// 	};
	// 	getData();
	// }, [jwt]);

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
							<th scope='col'>Elimina</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{false &&
							users?.map((user) => {
								return (
									<tr key={user.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{new Date(user.created_at).toLocaleString()}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.is_admin ? 'Amministratore' : 'Utente'}</td>
										<td>{user.hotel.name}</td>
										<td>
											<button
												type='button'
												className='px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200'
												onClick={async () => {
													const resp = await fetch(
														`http://localhost:3000/api/albergatori/${user.id}`,
														{
															method: 'DELETE',
															headers: {
																Authorization: `Bearer ${jwt}`,
															},
														}
													);
													const data = await resp.json();
													if (data.status === 'success') {
														setUsers((prev) =>
															prev.filter((u) => u.id !== user.id)
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
