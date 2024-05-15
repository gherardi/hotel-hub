import { Resend } from 'resend';
import { env } from '../utils/env';

const resend = new Resend(env.RESEND_API_KEY);

const from = `Hotel Hub <${process.env.RESEND_EMAIL_FROM}>`;

export const sendPasswordResetEmail = async (
	email: string,
	resetUrl: string
) => {
	try {
		await resend.emails.send({
			from,
			to: [email],
			subject: `Here's your password reset link (valid for only ${process.env.PASSWORD_RESET_EXPIRES_IN} minutes)`,
			text: `Click on this link to reset your password ${resetUrl}`,
		});
	} catch (err) {
		throw err;
	}
};
