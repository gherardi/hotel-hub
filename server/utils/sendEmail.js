import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export default class Email {
	constructor(email, resetURL) {
		this.from = `Hotel Hub <${process.env.EMAIL_FROM}>`;
		this.to = email;
		this.resetURL = resetURL;
	}

	async sendPasswordReset() {
		try {
			const msg = {
				from: this.from,
				to: this.to,
				subject: `Your password reset token (valid for only ${process.env.PASSWORD_RESET_EXPIRES_IN} minutes)`,
				text: 'Reset your password here',
				html: `<strong>to reset your password click <a href=${this.resetURL}>here</a></strong>
          <br><br><br>
          if the link doesn't work copy and paste this url in your browser: ${this.resetURL}
          <br><br><br>
          If you didn't forget your password, please ignore this email!
        `,
			};

			const [ret] = await sendGrid.send(msg);
			if (ret.statusCode !== 202)
				throw new Error('There was an error sending the email. Try again later!');
		} catch (err) {
			throw err;
		}
	}
}
