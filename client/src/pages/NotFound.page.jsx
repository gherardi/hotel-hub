import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className='flex flex-col items-center justify-center gap-4 h-svh'>
			<h1>404: Not Found</h1>
			{/* The Link component is used to create a link to another page in the app without refreshing the page, which is the default behavior of an anchor tag. */}
			<Link to='/' className='underline underline-offset-2'>navigate to homepage</Link>
		</div>
	);
}
