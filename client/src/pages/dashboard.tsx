import PageLayout from '@/layouts/page-layout';

// import { Button } from '@/components/ui/button';
// import { CalendarDateRangePicker } from '@/components/ui/date-range-picker';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { SummaryCards } from '@/components/ui/summary-cards';

export default function Dashboard() {
	return (
		<PageLayout>
			<div className='flex items-center justify-between space-y-2'>
				<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
				<div className='flex items-center space-x-2'>
					{/* <CalendarDateRangePicker />
					<Button>Download</Button> */}
				</div>
			</div>

			<div className='space-y-4 pb-8 md:pb-0'>
				<SummaryCards />
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
					<Card className='col-span-4'>
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent className='pl-2'>
							{/* <Overview /> */}
							overview component
						</CardContent>
					</Card>
					<Card className='col-span-4 lg:col-span-3'>
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>You made 265 sales this month.</CardDescription>
						</CardHeader>
						<CardContent>
							{/* <RecentSales /> */}
							recent sales component
						</CardContent>
					</Card>
				</div>
			</div>
		</PageLayout>
	);
}
