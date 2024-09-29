import OrbitingCircles from '@/components/landing/orbiting-circles-comp';

export function OrbitingCirclesComponent() {
	return (
		<div className='relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg'>
			<span className='font-semibold leading-none text-center text-transparent whitespace-pre-wrap pointer-events-none bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-8xl dark:from-white dark:to-slate-900/10'>
				Moderno
			</span>

			{/* Inner Circles */}
			<OrbitingCircles
				className='h-[30px] w-[30px] border-none bg-transparent'
				duration={20}
				delay={20}
				radius={80}
			>
				<Icons.typescript />
			</OrbitingCircles>
			<OrbitingCircles
				className='h-[30px] w-[30px] border-none bg-transparent'
				duration={20}
				delay={10}
				radius={80}
			>
				<Icons.tailwind />
			</OrbitingCircles>

			{/* Outer Circles (reverse) */}
			<OrbitingCircles
				className='h-[50px] w-[50px] border-none bg-transparent'
				reverse
				radius={190}
				duration={20}
			>
				<Icons.react />
			</OrbitingCircles>
			<OrbitingCircles
				className='h-[50px] w-[50px] border-none bg-transparent'
				reverse
				radius={190}
				duration={20}
				delay={20}
			>
				<Icons.supabase />
			</OrbitingCircles>
		</div>
	);
}

const Icons = {
	typescript: () => (
		<img
			src='https://utfs.io/f/5b51351d-218b-4931-a296-0a9275030aaf-8myeez.png'
			alt=''
			width={100}
			height={100}
		/>
	),
	tailwind: () => (
		<img
			src='https://utfs.io/f/666774c0-dc3a-4d5a-84b7-cc96e682db61-bhgw4o.png'
			alt=''
			width={100}
			height={100}
			// className="p-2 bg-black rounded"
		/>
	),
	supabase: () => (
		<img
			src='https://utfs.io/f/c62a5d13-91e4-476f-9d36-786d9995c97f-rqpuxo.png'
			alt=''
			width={100}
			height={100}
			// className="p-2 bg-black rounded"
		/>
	),
	react: () => (
		<img
			src='https://i.imgur.com/90zFEvq.png'
			alt=''
			width={100}
			height={100}
			// className='p-1 bg-white rounded'
		/>
	),
};
