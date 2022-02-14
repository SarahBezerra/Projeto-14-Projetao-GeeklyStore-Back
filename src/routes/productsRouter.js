import { Router } from 'express'
import { getAllProducts, getProductsFromCart, addProductsInCart, buyProducts, deleteProduct } from '../controllers/productsController.js';
import { validateToken } from '../middlewares/validateToken.js';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.post('/add-product-in-cart', validateToken, addProductsInCart);
productsRouter.get('/shopping-cart', validateToken, getProductsFromCart);
productsRouter.post('/buy', validateToken, buyProducts);
productsRouter.delete('/delete-product/:productId', validateToken, deleteProduct);

export default productsRouter;