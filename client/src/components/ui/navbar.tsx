import { UserAvatar } from '@/components/ui/user-avatar';
import { Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Navbar() {
	const pathname = location.pathname;

	return (
		<>
			<header className='sticky top-0 flex h-[--header-height] items-center gap-4 border-b bg-background px-4 md:px-8'>
				<nav className='font-medium flex flex-row items-center text-sm gap-6'>
					<Link
						to='/'
						className='flex items-center gap-2 text-lg font-semibold md:text-base'
					>
						<Hotel className='h-6 w-6' />
						<span className='sr-only'>Hotel Hub</span>
					</Link>
					<Link
						to='/dashboard'
						className={cn(
							'text-muted-foreground transition-colors hover:text-foreground',
							pathname === '/dashboard' ? 'text-semibold' : ''
						)}
					>
						Dashboard
					</Link>
					<Link
						to='/bookings'
						className={cn(
							'text-muted-foreground transition-colors hover:text-foreground',
							pathname === '/bookings' ? 'text-semibold' : ''
						)}
					>
						Prenotazioni
					</Link>
					<Link
						to='/rooms'
						className={cn(
							'text-muted-foreground transition-colors hover:text-foreground',
							pathname === '/rooms' ? 'text-semibold' : ''
						)}
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
