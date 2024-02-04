import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div>
			<h1>Home Page</h1>
			<p>This is the home page.</p>
			<Link to='/login'>navigate to login page</Link>
			<Link to='/signup'>navigate to signup page</Link>
		</div>
	);
}
