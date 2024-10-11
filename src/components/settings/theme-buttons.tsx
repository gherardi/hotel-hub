import { Moon, Sun, MonitorCog } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeButtons() {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<p className='mt-4 mb-2 text-sm text-muted-foreground'>
				Scegli il tuo tema
			</p>
			<div className='flex gap-x-2 text-muted-foreground'>
				<Button
					variant='outline'
					size='sm'
					className={cn(
						'space-x-1.5',
						theme === 'light' ? 'text-foreground bg-muted/75' : ''
					)}
					onClick={() => setTheme('light')}
				>
					<Sun className='w-4 h-4' />
					<span className='pb-0.5'>Chiaro</span>
				</Button>
				<Button
					variant='outline'
					size='sm'
					className={cn(
						'space-x-1.5',
						theme === 'dark' ? 'text-foreground bg-muted/75' : ''
					)}
					onClick={() => setTheme('dark')}
				>
					<Moon className='w-4 h-4' />
					<span className='pb-0.5'>Scuro</span>
				</Button>
				<Button
					variant='outline'
					size='sm'
					className={cn(
						'space-x-1.5',
						theme === 'system' ? 'text-foreground bg-muted/75' : ''
					)}
					onClick={() => setTheme('system')}
				>
					<MonitorCog className='w-4 h-4' />
					<span className='pb-0.5'>Sistema</span>
				</Button>
			</div>
		</>
	);
}
