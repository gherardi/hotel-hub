import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	PORT: z.string(),
	NODE_ENV: z.string(),

	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string(),
	JWT_COOKIE_EXPIRES_IN: z.string(),
	SALT: z.string(),
	PASSWORD_RESET_EXPIRES_IN: z.string(),

	RESEND_API_KEY: z.string(),
	RESEND_EMAIL_FROM: z.string(),

	SUPABASE_URL: z.string(),
	SUPABASE_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
