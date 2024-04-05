import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const from = 'Hotel Hub <onboarding@resend.dev>';

export const sendWelcomeEmail = async (email) => {
	await resend.emails.send({
    from,
    to: [email],
    subject: 'Welcome to Hotel Hub',
    text: 'Welcome to Hotel Hub. We are excited to have you on board!',
  });
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
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
