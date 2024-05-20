import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';

export default function Landing () {
	return (
		<>
			<Header />
			<main className='container debug'>
				<Hero />
			</main>
		</>
	);
}
