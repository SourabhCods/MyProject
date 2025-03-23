import express from "express";
import { getAllProducts, getproductInfo , getProductsOnFilter } from "../controllers/product.js";
const router = express.Router();

router.get('/allProducts' ,  getAllProducts)
router.post('/filter/products' , getProductsOnFilter)
router.post('/productInfo/:id' , getproductInfo)
export default router;