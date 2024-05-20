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
				<Button variant={'ghost'}>
					<Link to='/login'>Accedi</Link>
				</Button>
				<Button>
					<Link to='/signup'>Registrati</Link>
				</Button>
			</div>
		</header>
	);
}
