import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  // e.g., 'smtp.example.com'
  port: Number(process.env.SMTP_PORT),  // e.g., 587                            
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // your SMTP username
        pass: process.env.SMTP_PASS  // your SMTP password
    }       
}); 

export default transporter;