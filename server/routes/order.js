import express from 'express'
import { 
    createOrdersFromCart,
    createSingleOrder, 
    deleteOrder,
    getRecentProductOrderCount,
    updateUserOrderDetails
} from '../controllers/order.js'
const router  = express.Router()

router.get('/count/:product_id' , getRecentProductOrderCount)
router.post('/', createOrdersFromCart) // for creating/booking new orders
router.post('/single-order' , createSingleOrder)
router.patch('/udt_detail' , updateUserOrderDetails)
router.delete('/:order_id' , deleteOrder)
// router.get('/order-status' , updateOrderStatus)

export default router