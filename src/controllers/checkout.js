import nodemailer from "nodemailer"
import smtp from "../config/smtp.js";


export default async function checkout(request, response){
    try {

        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: false,
            auth: {
                user: smtp.user,
                pass: smtp.pass
                },
            tls:{
                rejectUnauthorized: false,
            }
        });

        await transporter.sendMail({
            text: "teste",
            subject: "teste",
            from: "Geekly Store <geeklystorenoreply@gmail.com>",
            to: "luishenrinquebraga@gmail.com"
        })

        response.sendStatus(200);
        
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
        
    }
}