import { ObjectId, UUID } from "bson";
import dayjs from "dayjs";
import db from "../db.js"
import { v4 as uuid } from "uuid"
import { text } from "express";

export async function getAllProducts(req, res) {

    const products = await db.collection("allProducts").find().toArray();

    res.send(products).status(200)
}

export async function addProductsInCart(req, res) {
    const {user} = res.locals;
    const {productId} = req.body;

    try {
        const shoppingCartCollection = db.collection("shoppingCarts");

        let userCart = await shoppingCartCollection.findOne({ userId: user._id })

        if(!userCart){
            await shoppingCartCollection.insertOne({ userId: user._id, products: [] })
            userCart = await shoppingCartCollection.findOne({ userId: user._id })
        }

        const allProductsCollection = db.collection("allProducts");
        const product = await allProductsCollection.findOne({ _id: new ObjectId(productId) })

        const id = uuid();
        await shoppingCartCollection.updateOne({ _id: userCart._id }, { $push: { "products" : product }})

        res.sendStatus(200);    

    }catch(error) {
        res.send(error)
    }
}

export async function getProductsFromCart(req, res) {
    const { user } = res.locals;
    let total = 0;

    try {
        const shoppingCartCollection = db.collection("shoppingCarts");

        const userCart = await shoppingCartCollection.findOne({ userId: new ObjectId(user._id) })

        if(!userCart){
            return res.sendStatus(404);
        }

        userCart.products?.map(product => total += parseFloat(product.price));

        const buyData = {
            userCart,
            total
        }

        res.status(200).send(buyData);

    }catch(error) {
        res.send(error)
    }
}

export async function buyProducts(req, res) {
    const { user } = res.locals;
    const { products } = req.body;

    try {
        const purchasesHistoricCollection = db.collection("purchasesHistoric");
        await purchasesHistoricCollection.insertOne({userId: user._id, date: dayjs().format('DD-MM-YYYY'), products});

        const shoppingCartCollection = db.collection("shoppingCarts");
        await shoppingCartCollection.deleteOne({ userId: user._id })

        res.sendStatus(200);

    }catch(error) {
        res.send(error)
    }
}

export async function deleteProduct(req, res) {
    const { user } = res.locals;
    const { productId } = req.params;

    try {
        const shoppingCartCollection = db.collection("shoppingCarts");
        const userCart = await shoppingCartCollection.findOne({ userId: user._id })

        var id1 = JSON.stringify(userCart.products[0]._id)
        var id2 = JSON.stringify(ObjectId(productId))

        res.sendStatus(200);

    }catch(error) {
        res.send(error)
    }
}