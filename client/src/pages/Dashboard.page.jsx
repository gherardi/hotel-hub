import { useAuth } from '../components/AuthProvider';

export default function DashboardPage() {
	const user = useAuth();

	return (
		<div>
			<h1 className='text-4xl text-red-400'>protected Page</h1>
			<p>This is a protected page route</p>
			<code>user uuid: {user?.uuid}</code>
		</div>
	);
}
