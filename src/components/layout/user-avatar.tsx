import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUser } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';

export function UserAvatar() {
	const { logout } = useLogout();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon' className='rounded-full'>
						<Avatar>
							<AvatarImage
								// src='https://github.com/gherardi.png'
								// src='https://github.com/shadcgasgsadn.png'
								alt='user avatar'
								className='object-cover'
							/>
							<AvatarFallback>
								<CircleUser className='w-5 h-5' />
							</AvatarFallback>
						</Avatar>
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
					<DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
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
		</>
	);
}
