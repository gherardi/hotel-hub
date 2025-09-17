import { Link, NavLink } from 'react-router-dom';
import { Menu, Package2 } from 'lucide-react';

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { navItems } from '@/components/layout/nav-items';

export function MobileNavbar() {
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
					<Link
						to='/'
						className='flex items-center gap-2 text-lg font-semibold'
					>
						<Package2 className='w-6 h-6' />
						<span className='sr-only'>Acme Inc</span>
					</Link>
					{navItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
						>
							{item.icon}
							<span>{item.name}</span>
						</NavLink>
					))}
				</nav>
				{/* <div className='mt-auto'>
					<Card>
						<CardHeader>
							<CardTitle>Upgrade to Pro</CardTitle>
							<CardDescription>
								Unlock all features and get unlimited access to our support
								team.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button size='sm' className='w-full'>
								Upgrade
							</Button>
						</CardContent>
					</Card>
				</div> */}
			</SheetContent>
		</Sheet>
	);
}
