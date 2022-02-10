import { Router } from 'express'
import { allProducts } from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/', allProducts);

export default productsRouter;