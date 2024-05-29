import Navbar from '@/components/ui/navbar';

interface SettingsLayoutProps {
	children: React.ReactNode;
}

{/* <main className='flex min-h-[--hero-height] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'> */}
{/* <main className='min-h-[--hero-height] flex flex-1 flex-col px-8 pt-6 gap-5 [&>*]:gap-5 bg-muted/40 space-y-4'> */}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<Navbar />
			<main className='min-h-[--hero-height] flex flex-1 flex-col px-8 pt-6 gap-5 [&>*]:gap-5 bg-muted/40 space-y-4'>
				{children}
			</main>
		</>
	);
}
