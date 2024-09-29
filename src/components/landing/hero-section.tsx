import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/landing/border-beam';

export default function HeroSection() {
	return (
		<section
			className='flex flex-col items-center justify-center leading-6 mt-[3rem]'
			aria-label='Nextjs Starter Kit Hero'
		>
			<h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl scroll-m-20 font-semibold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white'>
				Hotel Hub: Il tuo alleato digitale per le prenotazioni.
			</h1>
			<p className='mx-auto max-w-[700px] text-gray-500 text-center mt-2 dark:text-gray-400'>
				Hotel Hub è la piattaforma ideale per semplificare la gestione delle
				prenotazioni e delle camere. Migliora l'efficienza operativa e offri
				un'esperienza eccezionale ai tuoi ospiti con le nostre funzionalità
				avanzate.
			</p>
			<div className='flex items-center justify-center gap-3 pb-8'>
				<Link to='/signup' className='mt-5'>
					<Button className='text-sm font-semibold text-white bg-blue-600 rounded-md animate-buttonheartbeat hover:bg-blue-500'>
						Signup
					</Button>
				</Link>

				<Link to='/login' className='mt-5'>
					<Button variant='outline' className='flex gap-1'>
						Login
						<ArrowRight className='w-4 h-4' aria-hidden='true' />
					</Button>
				</Link>

				<a
					href='https://github.com/gherardi/hotel-hub'
					target='_blank'
					className='p-2 mt-5 border rounded-full animate-buttonheartbeat hover:dark:bg-black hover:cursor-pointer'
					aria-label='View NextJS 14 Starter Template on GitHub'
				>
					<Github className='w-5 h-5' aria-hidden='true' />
				</a>
			</div>
			<div>
				<div className='relative flex justify-center max-w-6xl overflow-hidden mt-7'>
					<div className='relative rounded-xl'>
						<img
							src='https://i.imgur.com/c9iCZD8.png'
							width={1100}
							height={550}
							alt='Product Preview'
							className='block rounded-[inherit] border object-contain shadow-lg dark:hidden'
						/>
						<img
							src='https://i.imgur.com/muW7OQD.png'
							width={1100}
							height={550}
							alt='Product Preview'
							className='dark:block rounded-[inherit] border object-contain shadow-lg hidden'
						/>
						<BorderBeam size={250} duration={12} delay={9} />
					</div>
				</div>
			</div>
		</section>
	);
}
