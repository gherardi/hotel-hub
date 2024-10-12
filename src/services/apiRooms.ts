import { supabase } from '@/database/supabase-client';
import { type roomSchemaType } from '@/components/rooms/room-schema';

export async function getRooms() {
	const { data, error } = await supabase.from('rooms').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
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
