import { UserAvatar } from '@/components/ui/user-avatar';
// import { MainNav } from '@/components/ui/main-nav';
import { Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<header className='sticky top-0 flex h-[--header-height] items-center gap-4 border-b bg-background px-4 md:px-8'>
				<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<Link
						to='/'
						className='flex items-center gap-2 text-lg font-semibold md:text-base'
					>
						<Hotel className='h-6 w-6' />
						<span className='sr-only'>Hotel Hub</span>
					</Link>
					<Link
						to='/dashboard'
						className='text-muted-foreground transition-colors hover:text-foreground'
					>
						Dashboard
					</Link>
					<Link
						to='/bookings'
						className='text-muted-foreground transition-colors hover:text-foreground'
					>
						Prenotazioni
					</Link>
					<Link
						to='/rooms'
						className='text-muted-foreground transition-colors hover:text-foreground'
					>
						Camere
					</Link>
				</nav>
				{/* SHEETS PER MOBILE, VEDERE ORIGINALE */}
				<div className='flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4'>
					<UserAvatar />
				</div>
			</header>
		</>
	);
}
