import { Router } from "express";
import checkout from "../controllers/checkout.js";

const checkoutRouter = Router()

checkoutRouter.post("/checkout", checkout)

export default checkoutRouter;