import { useAuth } from '../AuthProvider.jsx';
import { useState } from 'react'; // Import the useState hook from the react package

export default function AdminTable() {
	const token = useAuth();

	const [isLoading, setIsLoading] = useState(true);

	return (
		<table className='table-fixed'>
			<thead>
				<tr className='[&>*]:px-6 [&>*]:py-3 [&>*]:text-left [&>*]:whitespace-nowrap [&>*]:font-medium'>
					<th>id</th>
					<th>name</th>
					<th>email</th>
					<th>created at</th>
					<th>role</th>
				</tr>
			</thead>
			<tbody>
				<tr className='[&>*]:px-6 [&>*]:py-3 [&>*]:text-left [&>*]:whitespace-nowrap [&>*]:font-light'>
					<td><code>b62d631a-f5d8-4fbd-9935-b7b0b74da587</code></td>
					<td>Admin admin</td>
					<td>admin@gmail.com</td>
					<td>{new Date('2024-02-25 08:21:37.473856+00').toLocaleDateString()}</td>
          <td>user</td>
				</tr>
			</tbody>
		</table>
	);
}
