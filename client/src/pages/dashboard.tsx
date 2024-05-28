import Navbar from '@/components/ui/navbar';
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
	return (
		<>
			<Navbar />
			<main className='h-[--hero-height] px-8 gap-5 [&>*]:gap-5 space-y-5 bg-muted/40'>
				<div className='flex items-center justify-between pt-5'>
					<h1 className='text-3xl font-bold tracking-'>Dashboard</h1>
					<div className='flex items-center space-x-2'>
						<CalendarDateRangePicker />
					</div>
				</div>

				<div className='grid grid-cols-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Incasso totale
							</CardTitle>
							<DollarSign className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>$45,231.89</div>
							<p className='text-xs text-muted-foreground'>
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Prenotazioni
							</CardTitle>
							<Users className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>2350</div>
							<p className='text-xs text-muted-foreground'>
								+180.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Prenotazioni all'attivo
							</CardTitle>
							<CreditCard className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+12,234</div>
							<p className='text-xs text-muted-foreground'>
								+19% from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Tasso di occupazione
							</CardTitle>
							<Activity className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+573</div>
							<p className='text-xs text-muted-foreground'>
								+201 since last hour
							</p>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-3 '>
					<div className='col-span-2 bg-foreground'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
						voluptatem asperiores blanditiis voluptatibus aspernatur labore
						suscipit explicabo architecto maiores deserunt?
					</div>
					<div className=''>
						<Card>
							<CardHeader>
								<CardTitle className='text-sm'>Recent Sales</CardTitle>
							</CardHeader>
							<CardContent className='grid gap-8'>
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage src='/avatars/01.png' alt='Avatar' />
										<AvatarFallback className='text-xs'>OM</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											Olivia Martin
										</p>
										<p className='text-sm text-muted-foreground'>
											olivia.martin@email.com
										</p>
									</div>
									<div className='ml-auto font-medium'>+$1,999.00</div>
								</div>
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage src='/avatars/02.png' alt='Avatar' />
										<AvatarFallback className='text-xs'>JL</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											Jackson Lee
										</p>
										<p className='text-sm text-muted-foreground'>
											jackson.lee@email.com
										</p>
									</div>
									<div className='ml-auto font-medium'>+$39.00</div>
								</div>
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage src='/avatars/03.png' alt='Avatar' />
										<AvatarFallback className='text-xs'>IN</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											Isabella Nguyen
										</p>
										<p className='text-sm text-muted-foreground'>
											isabella.nguyen@email.com
										</p>
									</div>
									<div className='ml-auto font-medium'>+$299.00</div>
								</div>
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage src='/avatars/04.png' alt='Avatar' />
										<AvatarFallback className='text-xs'>WK</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											William Kim
										</p>
										<p className='text-sm text-muted-foreground'>
											will@email.com
										</p>
									</div>
									<div className='ml-auto font-medium'>+$99.00</div>
								</div>
								<div className='flex items-center gap-4'>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarImage src='/avatars/05.png' alt='Avatar' />
										<AvatarFallback className='text-xs'>SD</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-sm font-medium leading-none'>
											Sofia Davis
										</p>
										<p className='text-sm text-muted-foreground'>
											sofia.davis@email.com
										</p>
									</div>
									<div className='ml-auto font-medium'>+$39.00</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
