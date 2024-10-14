import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
	return (
		<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
			<div className='flex items-center'>
				<Skeleton className='text-lg font-semibold text-transparent md:text-2xl'>
					Example title
				</Skeleton>
			</div>

			<Skeleton className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'></Skeleton>
		</main>
	);
}
