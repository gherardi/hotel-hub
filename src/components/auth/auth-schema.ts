import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
	password: z.string().min(8, {
		message: 'La password deve essere di almeno 8 caratteri',
	}),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema
	.extend({
		first_name: z.string().min(2, {
			message: 'Il nome deve essere di almeno 2 caratteri',
		}),
		last_name: z.string().min(2, {
			message: 'Il cognome deve essere di almeno 2 caratteri',
		}),
		repeatPassword: z.string().min(8, {
			message: 'La password deve essere di almeno 8 caratteri',
		}),
	})
	.refine((data) => data.password === data.repeatPassword, {
		path: ['repeatPassword'],
		message: 'Le password non corrispondono',
	});
export type signupSchemaType = z.infer<typeof signupSchema>;

export const updateProfileSchema = loginSchema.omit({ password: true }).extend({
	first_name: z.string().min(2, {
		message: 'Il nome deve essere di almeno 2 caratteri',
	}),
	last_name: z.string().min(2, {
		message: 'Il cognome deve essere di almeno 2 caratteri',
	}),
});

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>;
