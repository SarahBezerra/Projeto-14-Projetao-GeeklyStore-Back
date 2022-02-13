import db from "../db.js";

export async function getAllProducts(req, res) {
    const products = await db.collection("allProducts").find().toArray();

    res.send(products).status(200)
}

export async function postProductsInCart(req, res) {

}


export async function getProductsInCart(req, res) {
    const { user } = res.locals;

    const user = await db.collection("sessions").findOne({ token });

    console.log(user)
}