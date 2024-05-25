import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/auth-provider';
// import { ThemeToggler } from '@/components/theme-toggler';

export default function header() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { token } = useAuth();

	return (
		<header className='container h-[--header-height] flex justify-between items-center'>
			<Link to='/' className='text-xl font-bold'>
				Hotel Hub
			</Link>
			{/* <ThemeToggler /> */}
			<div className='space-x-4'>
				{token ? (
					<Button variant={'outline'} asChild size='sm'>
						<Link to='/profile'>
							Dashboard
						</Link>
					</Button>
				) : (
					<>
						<Button variant={'outline'} asChild size='sm'>
							<Link to='/login'>Accedi</Link>
						</Button>
						<Button asChild size='sm'>
							<Link to='/signup'>Registrati</Link>
						</Button>
					</>
				)}
			</div>
		</header>
	);
}
