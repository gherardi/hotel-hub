import { useNavigate } from 'react-router-dom';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserAvatar() {
	const { data, isPending } = useFetchProfile();

	const navigate = useNavigate();

	function handleNavigate(path: string) {
		navigate(path);
	}

	function handleLogout() {
		localStorage.removeItem('token');
		window.location.reload();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-9 w-9 rounded-full'>
					<Avatar className='h-9 w-9'>
						<AvatarImage src='/avatars/01.png' alt='@gherardi' />
						<AvatarFallback className='text-xs uppercase'>
							{isPending
								? ''
								: data.data.first_name[0] + data.data.last_name[0]}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1 py-2'>
						<p className='text-sm font-medium leading-none'>
							{isPending
								? ''
								: data.data.first_name + ' ' + data.data.last_name}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{isPending ? '' : data.data.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => handleNavigate('/profile')}>
						Profilo
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					{/* <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
						Impostazioni
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
