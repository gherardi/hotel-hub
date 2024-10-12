import { z } from 'zod';

export const bookingSchema = z.object({
	customer_fullname: z.string().min(2),
	check_in: z.date(),
	check_out: z.date(),
	room_id: z.string().uuid(),
	notes: z.string().optional(),
});
// .refine((data) => data.discount < data.price, {
// 	path: ['discount'],
// 	message: 'Lo sconto deve essere minore del prezzo',
// });

export type BookingSchemaType = z.infer<typeof bookingSchema>;

export const defaultValues = {
	customer_fullname: '',
	// check_in: '',
	// check_out: '',
	room_id: '',
	notes: '',
};
