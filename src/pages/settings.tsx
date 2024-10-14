import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeButtons } from '@/components/settings/theme-buttons';
import { UpdateProfile } from '@/components/settings/update-profile';

export function Settings() {
	return (
		<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
			<div className='flex items-center'>
				<h1 className='text-lg font-semibold md:text-2xl'>Impostazioni</h1>
			</div>

			<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
				<div className='absolute inset-0'>
					<ScrollArea className='w-full h-full p-5 [&>:nth-child(1)]:[&>:nth-child(2)]:space-y-5'>
						<UpdateProfile />
						<ThemeButtons />
					</ScrollArea>
				</div>
			</div>
		</main>
	);
}
