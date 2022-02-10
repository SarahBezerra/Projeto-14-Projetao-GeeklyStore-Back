import { Router } from "express";
import signIn from "../controllers/signIn.js";
import signInValidateSchemaMiddleware from "../middlewares/signInValidateSchemaMiddleware.js";

const signInRouter = Router()

signInRouter.post("/sign-in", signInValidateSchemaMiddleware, signIn)

export default signInRouter;