// import { Moon, Sun } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ThemeToggler() {
	const { setTheme, theme } = useTheme();

	return (
		<div className='flex items-center space-x-2'>
			<Switch
				id='airplane-mode'
				checked={theme === 'dark'}
				onCheckedChange={(e) => setTheme(e ? 'dark' : 'light')}
			/>
			<Label htmlFor='airplane-mode'>Dark Mode</Label>
		</div>
	);
}
