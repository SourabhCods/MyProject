import express from 'express'
import { 
    createOrdersFromCart, 
    getAllOrders , 
    createSingleOrder, 
    deleteOrder,
    getRecentProductOrderCount
} from '../controllers/order.js'
const router  = express.Router()

router.get('/count/:product_id' , getRecentProductOrderCount)
router.post('/', createOrdersFromCart) // for creating/booking new orders
router.post('/single-order' , createSingleOrder)
router.delete('/:order_id' , deleteOrder)
router.get('/:userid' , getAllOrders)
// router.get('/order-status' , updateOrderStatus)

export default router