import express from 'express'
import { createNewUser , addToCart ,getCartItems , updateCartPdtQuantity } from '../controllers/user.js'
const router = express.Router()

router.post('/', createNewUser)
router.post('/cart/:id' , updateCartPdtQuantity)
router.post('/cart' , addToCart)
router.get('/cart/:id', getCartItems)


export default router