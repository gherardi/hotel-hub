import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { navItems } from '@/components/layout/nav-items';
import { Button } from '@/components/ui/button';

export function CommandSearch() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const handleSelect = (path: string) => {
		navigate(path);
		setOpen(false); // Close the dialog after navigating
	};

	return (
		<>
			<div className='w-full md:w-2/3 lg:w-1/3'>
				<Button
					variant='outline'
					className='flex items-center justify-between w-full overflow-hidden gap-x-2 bg-muted group min-w-fit'
					onClick={() => setOpen(true)}
				>
					<span className='transition-colors text-muted-foreground group-hover:text-foreground'>
						Shortcut
					</span>
					<kbd className='pointer-events-none hidden md:inline-flex h-5 select-none group-hover:text-foreground items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
						ctrl + J
					</kbd>
				</Button>
			</div>

			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				description='Command menu'
			>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						{navItems.map((item) => (
							<CommandItem
								key={item.path}
								onSelect={() => handleSelect(item.path)}
							>
								{item.icon}
								<span className='ml-2'>{item.name}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
				</CommandList>
			</CommandDialog>
		</>
	);
}
