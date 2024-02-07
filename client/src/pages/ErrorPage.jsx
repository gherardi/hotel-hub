export default function ErrorPage({ error }) {
	return (
		<div className='flex items-center justify-center h-svh'>
			<div>{error ? error : 'something went very wrong...'}</div>;
		</div>
	);
}
