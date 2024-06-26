import Navbar from '@/components/ui/navbar';

interface PageLayoutProps {
	children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
	return (
		<>
			<Navbar />
			<main className='min-h-[--hero-height] px-8 pt-6 gap-5 [&>*]:gap-5 bg-muted/40 space-y-4'>
				{children}
			</main>
		</>
	);
}
