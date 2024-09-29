import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	AlertDialog,
	AlertDialogAction,
	// AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { logout } from '@/components/auth/logout';
import AppHeaderMobile from '@/components/app/header-mobile';

export function Header() {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	return (
		<header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
			<AppHeaderMobile></AppHeaderMobile>
			<div className='flex-1 w-full'>
				<form>
					<div className='relative'></div>
				</form>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='secondary' size='icon' className='rounded-full'>
						<CircleUser className='w-5 h-5' />
						<span className='sr-only'>Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Account personale</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate('/settings')}>
						Impostazione
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						Supporto
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* support dialog */}
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supporto clienti</AlertDialogTitle>
						<AlertDialogDescription>
							Funzionalità di supporto clienti non ancora implementata.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						{/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
						<AlertDialogAction>Chiudi</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</header>
	);
}
