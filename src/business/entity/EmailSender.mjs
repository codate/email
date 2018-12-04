import nodemailer from 'nodemailer'

class EmailSender {
    async send({from, to, subject, html, text, password}) {
        return new Promise((resolve, reject) => {
            let transporter = this.createTransport(from, password)
            const email = arguments[0]
            delete email.password
            transporter.sendMail(email, (error, info) => {
                if (error) return reject(error)
                resolve(info)
            })
        })
    }

    createTransport(from, password) {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secureConnection: process.env.EMAIL_SECURE || false,
            auth: {
                user: from,
                pass: password
            },
            tls: {
                rejectUnauthorized: false,
                ciphers:'SSLv3'
            }
        })
    }
}

const emailSender = new EmailSender()
export default emailSender
