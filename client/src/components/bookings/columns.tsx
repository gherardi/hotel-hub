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
		accessorKey: 'customer_fullname',
		header: 'Nominativo',
	},
	{
		accessorKey: 'start_date',
		header: 'Arrivo',
		cell: ({ row }) => {
			const date = new Date(row.getValue('start_date'));
			return <div>{date.toLocaleDateString()}</div>;
		}
	},
	{
		accessorKey: 'end_date',
		header: 'Partenza',
		cell: ({ row }) => {
			const date = new Date(row.getValue('end_date'));
			return <div>{date.toLocaleDateString()}</div>;
		}
	},
	{
		accessorKey: 'num_guests',
		header: 'Ospiti',
	},
	{
		accessorKey: 'room_price',
		header: 'Prezzo/notte',
		cell: ({ row }) => {
      const amount = parseFloat(row.getValue("room_price"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className='font-medium'>{formatted}</div>
    },
	},
	{
		accessorKey: 'num_nights',
		header: 'Numero notti',
	},
	{
		accessorKey: 'total_price',
		header: 'Prezzo totale',
		cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className='font-medium'>{formatted}</div>
    },
	},
	// {
	// 	accessorKey: 'capacity',
	// 	header: 'Capacità',
	// },
];
