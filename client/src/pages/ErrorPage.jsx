export default function ErrorPage({ error }) {
	return <div>{error ? error : 'something went very wrong...'}</div>;
}
