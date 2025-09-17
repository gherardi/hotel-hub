import { z } from 'zod';

export const roomSchema = z
	.object({
		code: z.string().length(3),
		capacity: z.number().min(1).max(10),
		price: z.number().min(10),
		discount: z.number(),
	})
	.refine((data) => data.discount < data.price, {
		path: ['discount'],
		message: 'Lo sconto deve essere minore del prezzo',
	});

export type roomSchemaType = z.infer<typeof roomSchema>;
