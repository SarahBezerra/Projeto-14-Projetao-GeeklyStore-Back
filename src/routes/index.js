import { Router } from "express";
import CheckoutRouter from "./CheckoutRouter.js";
import signInRouter from "./signInRouter.js";
import signUpRouter from "./signUpRouter.js";



const router = Router();

router.use(signInRouter);
router.use(signUpRouter);
router.use(CheckoutRouter);

export default router;