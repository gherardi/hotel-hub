import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Tables } from '@/database/database.types';

type RoomCardProps = {
	room: Tables<'rooms'>;
};

export function RoomCard({ room }: RoomCardProps) {
	return (
		<Card className='transition-shadow cursor-pointer bg-muted/40 hover:shadow'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					{room.code}
					{room.discount > 0 && (
						<Badge variant={'outline'} className='bg-background'>
							Scontata
						</Badge>
					)}
				</CardTitle>
				<CardDescription>Fino a {room.capacity} persone</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2'>
					<p className='font-medium'>Prezzo/notte</p>
					<p>{room.price}€</p>
					<p className='font-medium'>Sconto/notte</p>
					<p>{room.discount}€</p>
				</div>
			</CardContent>
		</Card>
	);
}
