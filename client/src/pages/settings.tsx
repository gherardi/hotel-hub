// import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import SettingsLayout from '@/layouts/settings-layout';
import ProfileSettings from '@/components/ui/profile-settings';
// import GeneralSettings from '@/components/ui/general-settings';

export default function Settings() {
	// const [view, setView] = useState<'profile' | 'general'>('profile');

	return (
		<SettingsLayout>
			<div className='mx-auto w-full max-w-6xl'>
				{/* <h2 className='text-3xl font-bold tracking-tight'>Impostazioni</h2> */}
				<h2 className='text-3xl font-bold tracking-tight'>Profilo</h2>
			</div>

			<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
				<nav className='grid gap-4 text-sm text-muted-foreground'>
					{/* <p
						className={cn(
							view === 'general' ? 'font-semibold text-primary' : '',
							'cursor-pointer'
						)}
						onClick={() => setView('general')}
					>
						Generali
					</p> */}
					<p
						className={cn(
							// view === 'profile' ? '' : '',
							'cursor-pointer font-semibold text-primary'
						)}
						// onClick={() => setView('profile')}
					>
						Profilo
					</p>
				</nav>
				<div className='grid gap-6'>
					{false && (
						<Card>
							<CardHeader>
								<CardTitle>Plugins Directory</CardTitle>
								<CardDescription>
									The directory within your project, in which your plugins are
									located.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form className='flex flex-col gap-4'>
									<Input
										placeholder='Project Name'
										defaultValue='no default value'
									/>
									<div className='flex items-center space-x-2'>
										<Checkbox id='include' defaultChecked />
										<label
											htmlFor='include'
											className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
										>
											Allow administrators to change the directory.
										</label>
									</div>
								</form>
							</CardContent>
							<CardFooter className='border-t px-6 py-4'>
								<Button>Save</Button>
							</CardFooter>
						</Card>
					)}
					{/* {view === 'profile' ? <ProfileSettings /> : null} */}
					{/* {view === 'general' ? <GeneralSettings /> : null} */}
					<ProfileSettings />
				</div>
			</div>
		</SettingsLayout>
	);
}
