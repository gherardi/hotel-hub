import PageLayout from '@/layouts/page-layout';
import { columns } from '@/components/rooms/columns';
import { DataTable } from '@/components/rooms/data-table';
import { useFetchRooms } from '@/hooks/useFetchRooms';
import { Button } from '@/components/ui/button';

export default function Rooms() {
	const { data, isPending } = useFetchRooms();
	return (
		<PageLayout>
			<div className='flex items-center justify-between space-y-2'>
				<h2 className='text-3xl font-bold tracking-tight'>Camere</h2>
				<Button size={"sm"}>Nuova camera</Button>
			</div>
			<div className='space-y-4 pb-8 md:pb-0 h-[calc(var(--hero-height)-96px)] relative overflow-auto border-t border-border rounded'>
				{isPending ? 'fetching data...' : null}
				{data ? <DataTable columns={columns} data={data} /> : null}
			</div>
		</PageLayout>
	);
}
