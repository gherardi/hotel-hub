export default function Hero() {
	return (
		<section className='debug pt-16 pb-24 md:pt-24'>
			<h1 className='text-4xl md:text-6xl  font-extrabold'>
				<span
					className='bg-clip-text text-transparent tracking-tight md:text-center block text-balance py-1'
					style={{
						backgroundImage:
							'linear-gradient(to left, #565656 0%, #121212 100%)',
					}}
				>
					Scopri il nuovo modo di gestire le tue prenotazioni in albergo.
				</span>
			</h1>
			<p className='md:text-center md:w-1/2 mx-auto text-balance leading-6 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel
				cupiditate eum quidem accusantium unde tempore accusamus.
			</p>
		</section>
	);
}
