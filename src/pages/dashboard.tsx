import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/app/sidebar';
import { Header } from '@/components/app/header';

export default function Dashboard() {
	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block'>
				<Sidebar />
			</div>
			<div className='flex flex-col'>
				<Header />
				<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
					<div className='flex items-center'>
						<h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
					</div>
					<div
						x-chunk='An empty state showing no products with a heading, description and a call to action to add a product.'
						className='flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm'
					>
						<div className='flex flex-col items-center gap-1 text-center'>
							<h3 className='text-2xl font-bold tracking-tight'>
								You have no products
							</h3>
							<p className='text-sm text-muted-foreground'>
								You can start selling as soon as you add a product.
							</p>
							<Button className='mt-4'>Add Product</Button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
