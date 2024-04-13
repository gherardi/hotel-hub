import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div className='h-screen text-background sm:p-4 lg:p-6'>
			<div className='relative flex items-center w-full h-full overflow-hidden bg-gray-900 sm:shadow-xl sm:rounded-xl lg:shadow-3xl lg:rounded-3xl'>
				<div className='w-full lg:flex'>
					<div className='flex flex-col items-center justify-center max-w-md gap-6 mx-auto text-center lg:text-left'>
						<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
							Migliora il tuo albergo.
							<br />
							Inizia ad usare Hotel Hub oggi.
						</h2>
						<p className='text-lg leading-8 text-background-hover'>
							Hotel Hub nasce con l&apos;obiettivo di migliorare la gestione del
							tuo albergo. Con Hotel Hub puoi gestire le prenotazioni, i clienti
							e le stanze in modo semplice.
						</p>
						<div className='flex items-center justify-center w-full text-sm font-semibold gap-x-6 lg:justify-start'>
							<Link
								to='/signup'
								className='rounded-md bg-background text-content px-3.5 py-2.5 shadow-sm hover:bg-background-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background'
							>
								Registrati
							</Link>
							<Link to='/login' className='px-3.5 py-2.5 rounded-md'>
								Accedi <span aria-hidden='true'>→</span>
							</Link>
						</div>
					</div>
					<div>
						<img
							className='-mr-64 left-0 top-0 w-[57rem] max-w-none rounded-md ring-1 ring-background/10'
							src='https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
							alt='App screenshot'
							width={1824}
							height={1080}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
