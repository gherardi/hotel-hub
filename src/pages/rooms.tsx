import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/components/rooms/room-card';
import { useRoomStore } from '@/stores/room-store';
import { RoomForm } from '@/components/rooms/room-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function Rooms() {
	const rooms = useRoomStore((state) => state.rooms);
	const isRoomUpdating = useRoomStore((state) => state.isRoomUpdating);
	const updateRooms = useRoomStore((state) => state.updateRooms);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// Fetch rooms
		updateRooms();
	}, []);

	return (
		<>
			<main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-lg font-semibold md:text-2xl'>Camere</h1>
					{rooms.length !== 0 && (
						<Button
							size='sm'
							className='h-8 gap-1'
							onClick={() => setOpen(true)}
						>
							<PlusCircle className='w-4 h-4' />
							<p className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
								Aggiungi
							</p>
						</Button>
					)}
				</div>
				{isRoomUpdating && (
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
				)}

				{!isRoomUpdating ? (
					rooms.length === 0 ? (
						<div className='flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm'>
							<div className='flex flex-col items-center gap-1 text-center'>
								<h3 className='text-2xl font-bold tracking-tight'>
									Non hai camere disponibili
								</h3>
								<p className='text-sm text-muted-foreground'>
									Puoi iniziare a creare prenotazioni non appena aggiungi una
									camera.
								</p>
								<Button className='mt-4' onClick={() => setOpen(true)}>
									Aggiungi camera
								</Button>
							</div>
						</div>
					) : (
						<div className='flex-1 rounded-lg'>
							<div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
								{rooms.map((room) => (
									<RoomCard key={room.id} room={room} />
								))}
							</div>
						</div>
					)
				) : null}
			</main>
			<RoomForm open={open} setOpen={setOpen} />
		</>
	);
}
