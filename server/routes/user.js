import express from 'express'
import { createNewUser , addToCart ,getCartItems , updateCartPdtQuantity, getOrders} from '../controllers/user.js'
const router = express.Router()

router.post('/', createNewUser)
router.post('/cart/:id' , updateCartPdtQuantity)
router.post('/cart' , addToCart)
router.get('/cart/:id', getCartItems)
router.post('/orders' , getOrders)


export default router