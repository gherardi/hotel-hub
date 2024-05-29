import { useTheme } from '@/components/theme-provider';

export default function Hero() {
	const { theme } = useTheme();

	return (
		<section className='pt-16 pb-24 md:pt-24'>
			<h1 className='text-4xl md:text-6xl font-extrabold'>
				<span
					className='bg-clip-text text-transparent tracking-tight md:text-center block text-balance py-4'
					style={{
						backgroundImage:
							theme === 'dark'
								? 'linear-gradient(to right, #EAEAEA 0%, #8B8B8B 100%)'
								: 'linear-gradient(to left, #565656 0%, #121212 100%)',
					}}
				>
					La soluzione definitiva per la gestione delle prenotazioni.
				</span>
			</h1>
			<p className='md:text-center text-balance md:w-2/3 mx-auto leading-6 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground'>
				Hotel Hub è la piattaforma ideale per semplificare la gestione delle
				prenotazioni e delle camere. Migliora l'efficienza operativa e offri
				un'esperienza eccezionale ai tuoi ospiti con le nostre funzionalità
				avanzate.
			</p>
			<div className='flex md:justify-center items-center gap-x-2.5 mt-4 text-muted-foreground'>
				<div
					className='h-2 w-2 bg-[#d51616] rounded-full shadow-[#cf1212] mt-0.5'
					style={{ boxShadow: '0 0 0 4px rgba(213, 21, 21, .27)' }}
				></div>
				<p>stato: non disponibile</p>
			</div>
		</section>
	);
}
