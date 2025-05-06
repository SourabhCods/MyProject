import express from "express";
import { getAllProducts, getproductInfo , getProductsByCategory, getProductsOnFilter } from "../controllers/product.js";
const router = express.Router();

router.get('/allProducts' ,  getAllProducts)
router.get('/:category',  getProductsByCategory)
router.post('/filter/products' , getProductsOnFilter)
router.post('/productInfo/:id' , getproductInfo)
export default router;