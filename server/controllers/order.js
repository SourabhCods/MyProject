import Order from "../models/order.js"
import User from "../models/user.js";
const createOrdersFromCart = async (req, res) => {
    
    const data = req.body.currCart; // cart array
    try {
        // Use Promise.all to handle multiple asynchronous operations
        const orders = await Promise.all(
            data.map(async (obj) => {
                const newOrder = new Order({
                    consumerId : req.body.currUserId,
                    productData: obj, 
                    status : "Order Placed",
                    date: {
                        dateOfOrder: Date.now(),
                        dateOfDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
                    },
                });
                const savedOrder = await newOrder.save();
                const updatedUser = await User.findOneAndUpdate(
                    {userAuthId : req.body.currUserId},
                    { $push: { orders: savedOrder._id } , $pull: { cartItems: obj} },
                    { new: true }
                )
                console.log(updatedUser)
                // io.emit("order_created", savedOrder);
                return newOrder; // Return the saved order
            })
        );
        res.send(orders);
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ message: 'Failed to create orders', error: error.message });
    }
}; 

const getAllOrders = async(req,res) => {
    try {
        const _curr_user_id  = req.params.userid
        console.log(_curr_user_id)
        const user = await User.findOne({userAuthId : _curr_user_id}).populate('orders')
        // res.send(user.orders)

    } catch (error) {
        console.log(error)
    }
}

const createSingleOrder = async(req,res) => {

    const { user_firebase_id , product_mongo_id } = req.body
    const newSingleOrder = await new Order({
        consumerId : user_firebase_id,
        productData : {pdtId : product_mongo_id , qty : 1},
        status : "Order Placed",
        date: {
                dateOfOrder: Date.now(),
                dateOfDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
            }
    }).save()
    console.log(newSingleOrder)
    const updatedUserDocument = await User.findOneAndUpdate(
        {userAuthId : user_firebase_id},
        {$push: { orders: newSingleOrder._id }},
    )
    console.log(updatedUserDocument)
    res.send(updatedUserDocument)
    /* req.body = {
        ...
        data : {}
    } 
    */
}

const deleteOrder = async (req,res) => {
    const order_id  = req.params.order_id
    const user_doc_id = '67c4570e902c9ab51ef545e6'
    await User.findByIdAndUpdate(user_doc_id , {
    // pull / remove order from current session user's document
        $pull : {orders : order_id},
        }, 
        {new : true}
    )
    await Order.findByIdAndDelete(order_id)
}





export {
    createOrdersFromCart , 
    getAllOrders , 
    createSingleOrder,
    deleteOrder
}

             

