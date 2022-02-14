import { Router } from "express";
import checkoutRouter from "./checkoutRouter.js";
import productsRouter from "./productsRouter.js";
import signInRouter from "./signInRouter.js";
import signUpRouter from "./signUpRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();

router.use(productsRouter);
router.use(signInRouter);
router.use(signUpRouter);
router.use(checkoutRouter);
router.use(productsRouter);


export default router;