import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import db from "../db.js"

export default async function signIn(request, response) {

    try {

        const user = response.locals.user;

        const usersCollection = db.collection("users");
        const userLogin = await usersCollection.findOne({email: user.email});

        if(!userLogin){
            response.sendStatus(401);
            return;
        }

        const isAuthorized = bcrypt.compareSync(user.password, userLogin.password)

        if(isAuthorized){
            const token = uuid();
            const userExist = await db.collection("sessions").findOne({userId: userLogin._id})

            if(userExist){
                await db.collection("sessions").updateOne({
                    userId: userLogin._id
                }, {$set: {token: token}})
            
                response.status(200).send(token);
                return;
            
            }

            await db.collection("sessions").insertOne({token, userId: userLogin._id})
    
            response.status(200).send(token);
            return;
        }

        response.sendStatus(401);

        
    } catch (error) {

        console.log(error);
        response.sendStatus(500);

    }

}