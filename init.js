import mongoose from "mongoose";
import Product from "./models/product.js";
main()
.then(() => console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/meesho');
}

const initDb = async() => {
    await Product.deleteMany({})
    const res = await fetch('https://fakestoreapi.com/products')
    const jsonRes = await res.json()
    Product.insertMany(jsonRes)
    .then(() => console.log("Data insertion successful"))
    .catch(() => res.status(400).json({message : "Something went wrong"}))
}

initDb()