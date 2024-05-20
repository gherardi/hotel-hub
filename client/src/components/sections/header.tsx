import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function header() {
	return (
		<header className='container h-[--header-height] flex justify-between items-center'>
			<Link to='/' className='text-xl font-bold'>
				Hotel Hub
			</Link>
			{/* AGGIUNGER THEME TOGGLER */}
			<div className='space-x-4'>
				<Button variant={'ghost'} asChild size='sm'>
					<Link to='/login'>Accedi</Link>
				</Button>
				<Button asChild size='sm'>
					<Link to='/signup'>Registrati</Link>
				</Button>
			</div>
		</header>
	);
}
