import PageWrapper from '@/components/wrapper/page-wrapper';
import HeroSection from '@/components/landing/hero-section';
import SideBySide from '@/components/landing/side-by-side';
import MarketingCards from '@/components/landing/marketing-cards';

export default function Landing() {
	return (
		<PageWrapper>
			<div className='flex flex-col justify-center items-center w-full mt-[1rem] p-3'>
				<HeroSection />
			</div>
			<div className='flex my-[8rem] w-full justify-center items-center'>
				<SideBySide />
			</div>
			<div className='flex flex-col items-center justify-center w-full p-2'>
				<MarketingCards />
			</div>
		</PageWrapper>
	);
}
