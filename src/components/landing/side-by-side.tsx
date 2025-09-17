import { BarChart, Computer, Shapes } from 'lucide-react';
import { OrbitingCirclesComponent } from './orbiting-circles';

const features = [
	{
		name: 'Area personale:',
		description:
			'Gestisci camere e prenotazioni del tuo albergo da una dashboard personale.',
		icon: Computer,
	},
	{
		name: 'Prenotazioni:',
		description:
			'Aggiungi e modifica le prenotazioni del tuo albergo in modo semplice e intuitivo.',
		icon: Shapes,
	},
	{
		name: 'Reportistica e Statistiche:',
		description:
			'Monitora le performance del tuo albergo con report dettagliati e statistiche in tempo reale.',
		icon: BarChart,
	},
];

export default function SideBySide() {
	return (
		<div className='overflow-hidden '>
			<div className='px-6 mx-auto max-w-7xl lg:px-8'>
				<div className='grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='lg:pr-8 lg:pt-4'>
						<div className='lg:max-w-lg'>
							<p className='mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white'>
								Gestisci la tua struttura in modo semplice ed efficace
							</p>
							<p className='mt-6 leading-8 text-gray-600 dark:text-gray-400'>
								Hotel Hub semplifica la gestione di prenotazioni e camere.
							</p>
							<dl className='max-w-xl mt-10 space-y-8 leading-7 text-gray-600 lg:max-w-none'>
								{features.map((feature) => (
									<div key={feature.name} className='relative pl-9'>
										<dt className='inline font-semibold text-gray-900 dark:text-gray-100'>
											<feature.icon
												className='absolute w-5 h-5 left-1 top-1'
												aria-hidden='true'
											/>
											{feature.name}
										</dt>{' '}
										<dd className='inline dark:text-gray-400'>
											{feature.description}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
					<OrbitingCirclesComponent />
				</div>
			</div>
		</div>
	);
}
