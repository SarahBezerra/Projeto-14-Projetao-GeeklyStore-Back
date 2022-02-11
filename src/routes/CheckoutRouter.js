import { Router } from "express";
import checkout from "../controllers/checkout.js";

const CheckoutRouter = Router()

CheckoutRouter.post("/checkout", checkout)

export default CheckoutRouter;