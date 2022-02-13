import { Router } from "express";
import checkoutRouter from "./checkoutRouter.js";
import signInRouter from "./signInRouter.js";
import signUpRouter from "./signUpRouter.js";



const router = Router();

router.use(signInRouter);
router.use(signUpRouter);
router.use(checkoutRouter);

export default router;