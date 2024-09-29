import { Link } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { logout } from '@/components/auth/logout';
import { Button } from '@/components/ui/button';
import { navItems } from '@/components/app/nav-items';

export default function HeaderMobile() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
					<Menu className='w-5 h-5' />
					<span className='sr-only'>Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='flex flex-col'>
				<nav className='grid gap-2 text-lg font-medium'>
					{navItems.map((item, index) => (
						<Link
							key={index}
							to={item.path}
							className='flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary'
						>
							{item.icon}
							{item.name}
						</Link>
					))}
				</nav>
				<div className='p-4 mt-auto text-end'>
					<Button variant={'outline'} size={'icon'} onClick={logout}>
						<LogOut className='w-4 h-4' />
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
