import Product from "../models/product.js"
// function to get all products data/information
const getAllProducts = async(req,res) => {
    try{
        const allProducts = await Product.find()
        res.send(allProducts)
    }
    catch{err => console.log(err)}
}
//function to get data for a specific product
const getproductInfo = async(req,res) => {
    const {id} = req.params
    const prdtInfo = await Product.findById(id)
    res.send(prdtInfo)

    // .then(pdt => res.send(pdt))
    // .catch(e => console.log(e))
}


export {getAllProducts , getproductInfo}