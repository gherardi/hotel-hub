import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme/theme-provider';

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon' className='w-8 h-8'>
					<Sun className='w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute w-4 h-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Cambia tema</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Chiaro
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Scuro
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					Sistema
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
