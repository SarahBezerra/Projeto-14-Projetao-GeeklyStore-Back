import db from "../db.js";

export async function allProducts(req, res) {
    
    const products = await db.collection("allProducts").find().toArray();

    res.send(products).status(200)
}