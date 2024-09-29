import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	NavigationMenu,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';

export default function NavBar() {
	return (
		<div className='fixed z-10 flex justify-between min-w-full p-2 px-6 bg-white border-b dark:bg-black dark:bg-opacity-50'>
			<div className='flex justify-between w-full min-[825px]:hidden'>
				<Dialog>
					<SheetTrigger className='p-2 transition'>
						<Button
							size='icon'
							variant='ghost'
							className='w-5 h-5'
							aria-label='Open menu'
							asChild
						>
							<Building />
						</Button>
					</SheetTrigger>
					<SheetContent side='left'>
						<SheetHeader>
							<SheetTitle>Next Starter</SheetTitle>
						</SheetHeader>
						<div className='flex flex-col space-y-3 mt-[1rem]'>
							<DialogClose asChild>
								<Link to='/'>
									<Button variant='outline' className='w-full'>
										Home
									</Button>
								</Link>
							</DialogClose>
						</div>
					</SheetContent>
				</Dialog>
				<div className='flex items-center gap-2'>
					<ModeToggle />
				</div>
			</div>
			<NavigationMenu>
				<NavigationMenuList className='max-[825px]:hidden flex gap-3 w-[100%] justify-between'>
					<Link to='/' className='flex items-center pl-2' aria-label='Home'>
						<Building aria-hidden='true' />
						<span className='sr-only'>Home</span>
					</Link>
				</NavigationMenuList>
			</NavigationMenu>
			<div className='flex items-center gap-2 max-[825px]:hidden'>
				<ModeToggle />
			</div>
		</div>
	);
}
