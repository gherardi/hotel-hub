import { UserAvatar } from '@/components/ui/user-avatar';
import { MainNav } from '@/components/ui/main-nav';

export default function Navbar() {
	return (
		<div className='mx-auto border-b px-8 h-[--header-height]'>
			<div className='grid grid-cols-3 place-content-center h-full'>
				{/* <TeamSwitcher /> */}
				<div className='flex items-center justify-start'>
					<p className='font-semibold text-lg'>Victor Gherardi</p>
				</div>
				<div className='flex items-center justify-center'>
					<MainNav />
				</div>
				<div className='flex items-center justify-end'>
					<UserAvatar />
				</div>
			</div>
		</div>
	);
}
