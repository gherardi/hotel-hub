import { supabase } from '@/database/supabase-client';
import { type roomSchemaType } from '@/components/rooms/room-schema';

export async function getRooms() {
	const { data, error } = await supabase.from('rooms').select('*');

	if (error) {
		console.error(error);
		throw new Error('Rooms could not be loaded');
	}

	return data;
}

export async function createRoom(room: roomSchemaType) {
	const { data, error } = await supabase
		.from('rooms')
		.insert([room])
		.select('*');

	if (error) {
		console.error(error);
		throw new Error('Room could not be created');
	}

	return data;
}

export async function deleteRoom(id: string) {
	const { data, error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Room could not be deleted');
	}

	return data;
}
