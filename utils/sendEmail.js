import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export default class Email {
	constructor(user, resetURL) {
		this.from = `Hotel Hub <${process.env.EMAIL_FROM}>`;
		this.to = user.email;
		this.resetURL = resetURL;
	}

	async sendPasswordReset() {
		try {
			const resetToken = crypto.randomUUID();
			const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

			const mailOptions = {
				from: this.from,
				to: this.to,
				subject: 'Your password reset token (valid for only 10 minutes)',
				text: 'Reset your password here',
				html: `<strong>to reset your password click <a href=${this.resetURL}>here</a></strong>
          <br><br><br>
          if the link doesn't work copy and paste this url in your browser: ${this.resetURL}
          <br><br><br>
          If you didn't forget your password, please ignore this email!
        `,
			};

			await sendGrid.send(msg);
		} catch (err) {
			throw err;
		}
	}
}
