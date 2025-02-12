import express from "express";
import { getAllProducts, getproductInfo } from "../controllers/product.js";
const router = express.Router();

router.get('/allProducts' ,  getAllProducts)
router.post('/productInfo/:id' , getproductInfo)
export default router;