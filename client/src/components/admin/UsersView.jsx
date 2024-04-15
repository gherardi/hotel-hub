import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../AuthProvider.jsx';

export default function UsersView() {
	const jwt = useAuth();

	const {
		data: users,
		// isError,
		// error,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch('http://localhost:3000/api/users', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const { data } = await res.json();
			return data;
		},
		queryKey: ['users'],
	});

	return (
		<>
			<div className='flex justify-between pb-6'>
				<h2 className='text-3xl font-bold'>Utenti</h2>
				<button className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
					Crea utente
				</button>
			</div>

			<div className='relative overflow-x-auto border'>
				<table className='w-full text-sm text-left text-gray-500 '>
					<thead className='text-xs uppercase text-content/80 bg-background-hover'>
						<tr className='[&>*]:px-6 [&>*]:py-3'>
							<th scope='col'>tutto</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 empty:hidden'>
						{users &&
							users.map((user) => {
								return (
									<tr key={user.id} className='[&>*]:px-6 [&>*]:py-4'>
										<td>{`${user.first_name} ${user.last_name}`}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
