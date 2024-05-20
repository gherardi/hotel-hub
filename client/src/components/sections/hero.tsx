import { useTheme } from '@/components/theme-provider';

export default function Hero() {
	const { theme } = useTheme();

	return (
		<section className='pt-16 pb-24 md:pt-24'>
			<h1 className='text-4xl md:text-6xl font-extrabold'>
				<span
					className='bg-clip-text text-transparent tracking-tight md:text-center block text-balance py-1'
					style={{
						backgroundImage:
							theme === 'dark'
								? 'linear-gradient(to right, #EAEAEA 0%, #8B8B8B 100%)'
								: 'linear-gradient(to left, #565656 0%, #121212 100%)',
					}}
				>
					Scopri il nuovo modo di gestire le tue prenotazioni in albergo.
				</span>
			</h1>
			<p className='md:text-center md:w-1/2 mx-auto text-balance leading-6 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel
				cupiditate eum quidem accusantium unde tempore accusamus.
			</p>
			<div className='flex justify-center items-center gap-1.5 mt-4 text-muted-foreground'>
				<div
					className='h-2 w-2 bg-[#d51616] rounded-full shadow-[#cf1212] mt-0.5'
					style={{ boxShadow: '0 0 0 4px rgba(213, 21, 21, .27)' }}
				></div>
				<p>stato: non disponibile</p>
			</div>
		</section>
	);
}
