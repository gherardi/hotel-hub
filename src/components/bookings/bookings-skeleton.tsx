import { Skeleton } from '@/components/ui/skeleton';

export function BookingsSkeleton() {
	return (
		<div className='flex-1 rounded-lg'>
			<div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
				<div className='flex flex-col space-y-3'>
					<Skeleton className='h-[192px] rounded-xl' />
				</div>
				<div className='flex flex-col space-y-3'>
					<Skeleton className='h-[192px] rounded-xl' />
				</div>
			</div>
		</div>
	);
}
