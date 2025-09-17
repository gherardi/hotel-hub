import { Building2 } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

// import {
// 	Card,
// 	CardHeader,
// 	CardTitle,
// 	CardContent,
// 	CardDescription,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { navItems } from '@/components/layout/nav-items';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Sidebar() {
	return (
		<div className='hidden border-r bg-muted/40 md:block'>
			<div className='flex flex-col h-full max-h-screen gap-2'>
				<div className='flex min-h-14 items-center border-b px-4 lg:min-h-[60px] lg:px-6'>
					<Link to='/' className='flex items-center gap-2 font-semibold'>
						<Building2 className='w-6 h-6' />
						<span className=''>Hotel Hub</span>
					</Link>
					{/* <Button variant='outline' size='icon' className='w-8 h-8 ml-auto'>
						<Bell className='w-4 h-4' />
						<span className='sr-only'>Toggle notifications</span>
					</Button> */}
				</div>
				<div className='relative flex-1 overflow-hidden'>
					<ScrollArea className='w-full h-full'>
						<nav className='grid items-start px-2 space-y-0.5 text-sm font-medium lg:px-4'>
							{navItems.map((item) => (
								<NavLink
									key={item.path}
									to={item.path}
									className='flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/40'
								>
									{item.icon}
									<span>{item.name}</span>
								</NavLink>
							))}
						</nav>
					</ScrollArea>
				</div>
				<div className='p-4 mt-auto'>
					{/* <Card x-chunk='A card with a call to action'>
						<CardHeader className='p-2 pt-0 md:p-4'>
							<CardTitle>Upgrade to Pro</CardTitle>
							<CardDescription>
								Unlock all features and get unlimited access to our support
								team.
							</CardDescription>
						</CardHeader>
						<CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
							<Button size='sm' className='w-full'>
								Upgrade
							</Button>
						</CardContent>
					</Card> */}
				</div>
			</div>
		</div>
	);
}
