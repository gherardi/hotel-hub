import { ColumnDef } from '@tanstack/react-table';
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
		accessorKey: 'created_at',
		header: 'Data Creazione',
		cell: ({ row }) => {
			const date = new Date(row.getValue('created_at'));
			return <div>{date.toLocaleDateString()}</div>;
		}
	},
	{
		accessorKey: 'name',
		header: 'Numero',
	},
	{
		accessorKey: 'price',
		header: 'Prezzo',
		cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className='font-medium'>{formatted}</div>
    },
	},
	{
		accessorKey: 'capacity',
		header: 'Capacità',
	},
];
