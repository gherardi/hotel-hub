const ProjectsData = [
	{
		id: 1,
		name: 'React',
		description:
			'Una libreria JavaScript per costruire interfacce utente, mantenuta da Facebook.',
		image: 'https://i.imgur.com/90zFEvq.png',
		imageDark: 'https://i.imgur.com/90zFEvq.png',
		url: 'https://react.dev/',
	},
	{
		id: 2,
		name: 'TypeScript',
		description:
			'Un superset tipizzato di JavaScript che migliora la manutenibilità e la scalabilità del codice.',
		image: 'https://utfs.io/f/5b51351d-218b-4931-a296-0a9275030aaf-8myeez.png',
		url: 'https://www.typescriptlang.org/',
	},
	{
		id: 3,
		name: 'Tailwind CSS',
		description:
			'Un framework CSS basato su utility classes per costruire design personalizzati con facilità.',
		image: 'https://utfs.io/f/666774c0-dc3a-4d5a-84b7-cc96e682db61-bhgw4o.png',
		url: 'https://tailwindcss.com/',
	},
	{
		id: 4,
		name: 'Shadcn UI',
		description: 'Componenti progettati con cura da Shadcn.',
		image: 'https://utfs.io/f/bc4c7cdb-dc42-452c-8744-0ad2c3232e7f-exyul9.png',
		imageDark:
			'https://utfs.io/f/f9ae4f1b-76a1-4505-afc0-dfcbea05012d-62drog.png',
		url: 'https://ui.shadcn.com',
	},
	{
		id: 5,
		name: 'Supabase (PostgreSQL)',
		description:
			'Database open-source basato su PostgreSQL per costruire applicazioni scalabili.',
		image: 'https://utfs.io/f/c62a5d13-91e4-476f-9d36-786d9995c97f-rqpuxo.png',
		url: 'https://supabase.com/',
	},
	{
		id: 6,
		name: 'Zustand',
		description: 'Per per lo state management, alternativa a Redux.',
		image: 'https://i.imgur.com/mM0WuU7.png',
		url: 'https://zustand-demo.pmnd.rs/',
	},
];

export default function MarketingCards() {
	return (
		<div className='flex flex-col justify-center items-center lg:w-[75%] pb-24'>
			<div className='flex flex-col mb-[3rem]'>
				<h2 className='mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white'>
					Creato con le migliori tecnologie
				</h2>
				<p className='mx-auto max-w-[500px] text-gray-600 dark:text-gray-400 text-center mt-2 '>
					Hotel Hub è stato costruito con le migliori tecnologie per garantire
					un prodotto di qualità.
				</p>
			</div>
			<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{ProjectsData.map((project) => {
					return (
						<div
							key={project.id}
							className='p-6 mt-5 text-left border rounded-md dark:bg-black'
						>
							<a href={project?.url} target='_blank' rel='noopener noreferrer'>
								<img
									src={project?.imageDark ? project?.imageDark : project.image}
									width={40}
									height={30}
									className='mb-3 rounded'
									alt={project.name}
								/>
								<div className='mb-1 text-sm font-medium '>{project.name}</div>
								<div className='max-w-[250px] text-sm font-normal text-gray-600 dark:text-gray-400'>
									{project.description}
								</div>
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
