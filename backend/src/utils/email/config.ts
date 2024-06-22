import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jacynthe.kihn66@ethereal.email',
        pass: 'xuPYHX3z7rqtukuaTs'
    }
});

export default transporter;