import signUpFormSchema from "../schemas/signUpFormSchema.js";
import db from "../db.js";

export default async function signUpValidationSchemaMiddlware(request, response, next){

    try {
        const user = request.body;
        const validation = signUpFormSchema.validate(user, {abortEarly:false});

        if(validation.error){
            const error = validation.error.details.map( error => error.message);
            response.status(422).send(error);
            return;
        }

        const emailInUse = await db.collection("users").findOne({email: user.email});

        if(emailInUse){

            response.status(422).send("E-mail já está em uso");
            return;
        }

        if(user.password !== user.confirmPassword){
            response.status(422).send("As senhas não conferem");
            return;
        }

        next();
        
    } catch (error) {

        console.log(error);
        response.sendStatus(500);

    }

}