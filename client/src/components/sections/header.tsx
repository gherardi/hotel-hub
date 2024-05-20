import { Button } from '@/components/ui/button';

export default function header() {
	return (
		<header className='container py-6 flex justify-between debug items-center'>
			<a href='/' rel='noopener noreferrer' className='text-xl font-bold'>
				Hotel Hub
			</a>
			{/* AGGIUNGER THEME TOGGLER */}
			{/* DENTRO IL BUTTON METTERE LINK DI REACT ROUTER DOM */}
			<div className='space-x-4'>
				<Button variant={'ghost'}>Accedi</Button>
				<Button>Registrati</Button>
			</div>
		</header>
	);
}
