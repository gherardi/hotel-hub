import { Link } from 'react-router-dom';
import { Building2, LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { logout } from '@/components/auth/logout';
import { navItems } from '@/components/app/nav-items';

export function Sidebar() {
	const pathname = location.pathname;

	return (
		<div className='flex flex-col h-full max-h-screen gap-2'>
			<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
				<a href='/' className='flex items-center gap-2 font-semibold'>
					<Building2 className='w-6 h-6' />
					<span className=''>Hotel Hub</span>
				</a>
				<span className='ml-auto'>
					<ModeToggle />
				</span>
			</div>
			<div className='flex-1'>
				<nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
					{navItems.map((item, index) => (
						<Link
							key={index}
							to={item.path === '/dashboard' ? '#' : item.path}
							className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary ${
								pathname === item.path ? 'bg-muted text-primary' : ''
							} ${
								item.path === '/dashboard'
									? 'cursor-not-allowed hover:text-muted-foreground'
									: ''
							}`}
						>
							{item.icon}
							{item.name}
							{item.path === '/dashboard' ? (
								<Badge className='hidden ml-auto scale-75 lg:inline'>
									Coming soon...
								</Badge>
							) : null}
						</Link>
					))}
				</nav>
			</div>
			<div className='p-4 mt-auto text-end'>
				<Button variant={'outline'} size={'icon'} onClick={logout}>
					<LogOut className='w-4 h-4' />
				</Button>
			</div>
		</div>
	);
}
