import bcrypt from "bcrypt"
import db from "../db.js"

export default async function signUp (request, response){

    try {
        const user = request.body;
        const passwordHashed = bcrypt.hashSync(user.password,10);
        delete user.confirmPassword;

        const usersCollection = db.collection("users");
        const userData = await usersCollection.insertOne({...user, email: user.email.toLowerCase(), password: passwordHashed});
        
        if(!userData){
            response.sendStatus(401);
            return;
        }

        const shoppingCartCollection = db.collection("shoppingCarts");
        await shoppingCartCollection.insertOne({ userId: userData.insertedId, products: [] });

        response.sendStatus(200);
        
    } catch (error) {

        console.log(error);
        response.sendStatus(500);
    }
}