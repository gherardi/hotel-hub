import { MobileNavbar } from '@/components/layout/mobile-navbar';
import { CommandSearch } from './command-search';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { UserAvatar } from '@/components/layout/user-avatar';

export function Header() {
	return (
		<header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
			<MobileNavbar />

			<div className='flex-1 w-full'>
				<CommandSearch />
			</div>

			<ModeToggle />

			<UserAvatar />
		</header>
	);
}
