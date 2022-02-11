import signInFormSchema from "../schemas/signInFormSchema.js";

export default function signInValidateSchemaMiddleware(request, response, next){

    const user = request.body;
    const validation = signInFormSchema.validate(user, {abortEarly:false});

    if(validation.error){
        response.sendStatus(422);
        return;
    }

    response.locals.user = user;

    next();

}