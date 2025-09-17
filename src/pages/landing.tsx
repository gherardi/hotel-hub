import NavBar from '@/components/landing/navbar';
import HeroSection from '@/components/landing/hero-section';
import SideBySide from '@/components/landing/side-by-side';
import MarketingCards from '@/components/landing/marketing-cards';

export default function Landing() {
	return (
		<>
			<NavBar />
			<main className='flex min-w-screen min-h-svh flex-col pt-[4rem] items-center justify-between'>
				<div className='absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

				<div className='flex flex-col justify-center items-center w-full mt-[1rem] p-3'>
					<HeroSection />
				</div>
				<div className='flex my-[8rem] w-full justify-center items-center'>
					<SideBySide />
				</div>
				<div className='flex flex-col items-center justify-center w-full p-2'>
					<MarketingCards />
				</div>
			</main>
		</>
	);
}
