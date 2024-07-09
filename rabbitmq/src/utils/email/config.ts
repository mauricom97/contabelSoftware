import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jovany.leffler40@ethereal.email',
        pass: 'dDmzBhDdv989nxNP4t'
    }
});

export default transporter;