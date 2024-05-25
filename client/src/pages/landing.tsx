import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';

export default function Landing() {
	return (
		<>
			<Header />
			<main className='container'>
				<Hero />
				<div className='mx-auto relative h-[200svh]'>
					<img
						src='/mockup-laptop.png'
						alt='Macbook mockup'
						className='sticky top-0 scale-80'
					/>
				</div>
			</main>
		</>
	);
}
