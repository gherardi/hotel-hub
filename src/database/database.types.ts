export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			bookings: {
				Row: {
					booking_price: number;
					check_in: string;
					check_out: string;
					created_at: string;
					customer_fullname: string;
					id: string;
					notes: string | null;
					paid: boolean;
					room_code: string;
					room_discount: number;
					room_id: string;
					room_price: number;
					user_id: string;
				};
				Insert: {
					booking_price: number;
					check_in: string;
					check_out: string;
					created_at?: string;
					customer_fullname: string;
					id?: string;
					notes?: string | null;
					paid?: boolean;
					room_code: string;
					room_discount: number;
					room_id: string;
					room_price: number;
					user_id?: string;
				};
				Update: {
					booking_price?: number;
					check_in?: string;
					check_out?: string;
					created_at?: string;
					customer_fullname?: string;
					id?: string;
					notes?: string | null;
					paid?: boolean;
					room_code?: string;
					room_discount?: number;
					room_id?: string;
					room_price?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'bookings_room_id_fkey';
						columns: ['room_id'];
						isOneToOne: false;
						referencedRelation: 'rooms';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'bookings_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			rooms: {
				Row: {
					capacity: number;
					code: string;
					created_at: string;
					discount: number;
					id: string;
					price: number;
					user_id: string;
				};
				Insert: {
					capacity: number;
					code?: string;
					created_at?: string;
					discount?: number;
					id?: string;
					price: number;
					user_id?: string;
				};
				Update: {
					capacity?: number;
					code?: string;
					created_at?: string;
					discount?: number;
					id?: string;
					price?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'rooms_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
			PublicSchema['Views'])
	? (PublicSchema['Tables'] &
			PublicSchema['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
	? PublicSchema['Enums'][PublicEnumNameOrOptions]
	: never;
