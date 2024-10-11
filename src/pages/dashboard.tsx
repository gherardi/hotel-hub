export default function Dashboard() {
	return (
		<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
			<div className='flex items-center'>
				<h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
			</div>
			<div
				x-chunk='An empty state showing no products with a heading, description and a call to action to add a product.'
				className='flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm'
			>
				<div className='flex flex-col items-center gap-1 text-center'>
					<h3 className='text-2xl font-bold tracking-tight'>Coming soon...</h3>
					<p className='text-sm text-muted-foreground'>
						Funzionalità in arrivo...
					</p>
				</div>
			</div>
		</main>
	);
}
