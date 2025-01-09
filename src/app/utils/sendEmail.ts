import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail = async (to:string, resetLink:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
            user: "thisiskakonray@gmail.com",
            pass: "toof ecso iked zezu",
        },
    });

    await transporter.sendMail({
        from: 'thisiskakonray@gmail.com', // sender address
        to, // list of receivers
        subject: "Passwrod Reset ✔", // Subject line
        text: "Reset your password within 10 minutes!", // plain text body
        html:`<p>Reset your password within 10 minutes. This is Password reset link : <br> ${resetLink}</p>`, // html body
    });
}

