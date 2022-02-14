import nodemailer from "nodemailer"
import smtp from "../config/smtp.js";


export default async function checkout(request, response){
    try {
        const email = request.body.email
        
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
            text: "Sua compra foi confirmada com sucesso!",
            subject: "Confirmação da compra",
            from: "Geekly Store <geeklystorenoreply@gmail.com>",
            to: email
        })

        response.sendStatus(200);
        
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
        
    }
}