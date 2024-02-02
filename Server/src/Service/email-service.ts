require('dotenv').config()

import nodemailer from 'nodemailer'
class EmailService {
	transporter: any
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || 'HOST',
			port: Number(process.env.SMTP_PORT) || 587,
			secure: false,
			auth: {
				user: process.env.SMPT_USER || 'USER',
				pass: process.env.SMPT_PASSWORLD || 'PASSW',
			},
		})
	}
	async SendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMPT_USER,
			to,
			subject: `Активация аккаунта на ${process.env.API_URL}`,
			text: '',
			html: `
        <div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
        </div>
      `,
		})
	}
}
//berkutovmaks2@gmail.com

export default new EmailService()
