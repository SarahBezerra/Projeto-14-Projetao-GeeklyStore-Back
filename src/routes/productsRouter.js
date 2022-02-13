import { Router } from 'express'
import { getAllProducts, getProductsInCart, postProductsInCart } from '../controllers/productsController.js';
import { validateToken } from '../middleware/validateToken.js';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.post('/add-product-in-cart/:product_id', validateToken, postProductsInCart);// guardar produto no carrinho
productsRouter.get('/shopping-cart', validateToken, getProductsInCart);// ver produtos no carrinho

export default productsRouter;