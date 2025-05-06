import { createTransport } from 'nodemailer'

const smtpClient = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
})

export default smtpClient