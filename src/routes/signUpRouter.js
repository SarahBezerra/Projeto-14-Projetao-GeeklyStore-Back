import { Router } from "express";
import signUp from "../controllers/signUp.js";
import signUpValidationSchemaMiddlware from "../middlewares/signUpValidationMiddleware.js";

const signUpRouter = Router();

signUpRouter.post("/sign-up", signUpValidationSchemaMiddlware, signUp)

export default signUpRouter;