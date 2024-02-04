export default function HomePage({ error }) {
	return <div>{error ? error : 'something went very wrong...'}</div>;
}
