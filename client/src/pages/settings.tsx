import { Link } from 'react-router-dom';

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

export default function Settings() {
	return (
		<SettingsLayout>
			<div className='mx-auto w-full max-w-6xl mt-1.5'>
				<h2 className='text-3xl font-bold tracking-tight'>Impostazioni</h2>
			</div>

			<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
				<nav className='grid gap-4 text-sm text-muted-foreground'>
					<Link to='#' className='font-semibold text-primary'>
						Generali
					</Link>
					<Link to='#'>Profilo</Link>
				</nav>
				<div className='grid gap-6'>
					<Card x-chunk='dashboard-04-chunk-1'>
						<CardHeader>
							<CardTitle>Store Name</CardTitle>
							<CardDescription>
								Used to identify your store in the marketplace.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<Input placeholder='Store Name' />
							</form>
						</CardContent>
						<CardFooter className='border-t px-6 py-4'>
							<Button>Save</Button>
						</CardFooter>
					</Card>
					<Card x-chunk='dashboard-04-chunk-2'>
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
									defaultValue='/content/plugins'
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
				</div>
			</div>
		</SettingsLayout>
	);
}
