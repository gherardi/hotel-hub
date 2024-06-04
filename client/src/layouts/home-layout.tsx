import Header from '@/components/sections/header';

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<Header />
			<main className='h-[--hero-height] overflow-hidden container bg-[pink]'>
				{children}
			</main>
		</>
	);
}
// w-full h-[--hero-height] lg:grid lg:grid-cols-2'>
