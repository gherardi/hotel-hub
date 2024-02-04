import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div>
			<h1>404: Not Found</h1>
			{/* The Link component is used to create a link to another page in the app without refreshing the page, which is the default behavior of an anchor tag. */}
			<Link to='/'>
				navigate to homepage
			</Link>
		</div>
	);
}
