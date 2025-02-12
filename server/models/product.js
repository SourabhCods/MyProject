import { Schema , model } from "mongoose";

const productSchema = new Schema({
    category : String,
    title : String,
    description : String,
    price : Number,
    image : String,
    rating : Object
})

// defining the model
const Product = model('Product' , productSchema);

export default Product;