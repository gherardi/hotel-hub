import { useRooms } from '@/hooks/useRooms';
import { RoomCard } from '@/components/rooms/room-card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RoomsGallery() {
	const { rooms, isLoading } = useRooms();

	if (isLoading)
		return (
			<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
				<div className='absolute inset-0'>
					<ScrollArea className='w-full h-full p-5'>
						Loading rooms...
					</ScrollArea>
				</div>
			</div>
		);
	if (!rooms?.length)
		return (
			<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
				<div className='absolute inset-0'>
					<ScrollArea className='w-full h-full p-5'>No cabins found</ScrollArea>
				</div>
			</div>
		);

	return (
		<div className='relative flex-1 overflow-hidden border border-dashed rounded-lg shadow-sm'>
			<div className='absolute inset-0'>
				<ScrollArea className='w-full h-full p-5'>
					<div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
						{rooms.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
