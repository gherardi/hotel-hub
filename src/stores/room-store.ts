import { create } from 'zustand';
import { type Tables } from '@/database/database.types';
import { supabase } from '@/database/supabase-client';

type Room = Tables<'rooms'>;

type RoomStore = {
	isRoomUpdating: boolean;
	rooms: Room[];
	updateRooms: () => void;
	// setRooms: (rooms: Room[]) => void;
	// addRoom: (room: Room) => void;
	// addRoom: (room: Room) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
	isRoomUpdating: false,
	rooms: [],
	updateRooms: async () => {
		set({ isRoomUpdating: true });
		const { data: rooms, error } = await supabase.from('rooms').select('*');

		if (error) alert('errore');
		else if (rooms) {
			rooms.sort((a, b) => Number(a.code) - Number(b.code));
			set({ rooms });
		}

		set({ isRoomUpdating: false });
	},
	// setRooms: (rooms) => set({ rooms }),
	// addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
}));
