import { Router } from "express";
import signInRouter from "./signInRouter";


const router = Router();

router.use(signInRouter);

export default router;