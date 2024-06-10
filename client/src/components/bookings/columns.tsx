import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
export type Room = {
	id: string;
	name: string; // code
	created_at: string;
	price: number;
	hotel_id: string;
	capacity: number;
};

export const columns: ColumnDef<Room>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<div className='relative'>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					className='absolute top-1/2 transform -translate-y-1/2'
					aria-label='Select row'
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'created_at',
		header: 'Data Creazione',
		cell: ({ row }) => {
			const date = new Date(row.getValue('created_at'));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: 'customer_fullname',
		header: 'Nominativo',
		cell: ({ row }) => {
			const fullname = (
				row.getValue('customer_fullname') as string
			).toLowerCase();
			return <div className='capitalize'>{fullname}</div>;
		},
	},
	{
		accessorKey: 'start_date',
		header: 'Arrivo',
		cell: ({ row }) => {
			const date = new Date(row.getValue('start_date'));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: 'end_date',
		header: 'Partenza',
		cell: ({ row }) => {
			const date = new Date(row.getValue('end_date'));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: 'num_guests',
		header: 'Ospiti',
		cell: ({ row }) => {
			return <div>{row.getValue('num_guests')} ospite/i</div>;
		},
	},
	{
		accessorKey: 'num_nights',
		header: () => <div className=''>Numero notti</div>,
		cell: ({ row }) => {
			return <div className=''>{row.getValue('num_nights')}</div>;
		},
	},
	{
		accessorKey: 'room_price',
		header: 'Prezzo/notte',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('room_price'));
			const formatted = new Intl.NumberFormat('it-IT', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'total_price',
		header: 'Prezzo totale',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('total_price'));
			const formatted = new Intl.NumberFormat('it-IT', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	// {
	// 	accessorKey: 'capacity',
	// 	header: 'Capacità',
	// },
];
