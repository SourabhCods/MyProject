import Order from "../models/order.js"
import User from "../models/user.js";
const createOrdersFromCart = async (req, res) => {
    
    const {currCart, delivery_address, currUserId} = req.body // cart array
    try {
        // Use Promise.all to handle multiple asynchronous operations
        const orders = await Promise.all(
            currCart.map(async (obj) => {
                const newOrder = new Order({
                    consumerId : currUserId,
                    productData: obj, 
                    status : "Order Placed",
                    date: {
                        dateOfOrder: Date.now(),
                        dateOfDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
                    },
                    deliveryAddress : delivery_address,
                });
                const savedOrder = await newOrder.save();

                const updatedUser = await User.findOneAndUpdate(
                    {userAuthId : req.body.currUserId},
                    { $push: { orders: savedOrder._id } , $pull: { cartItems: obj} },
                    { new: true }
                )
                console.log(updatedUser)
                return newOrder; // Return the saved order
            })
        );
        res.send(orders);
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ message: 'Failed to create orders', error: error.message });
    }
}; 

const createSingleOrder = async(req,res) => {

    const { user_firebase_id , product_mongo_id , delivery_address , prdtQty, order_total_price } = req.body
    const newSingleOrder = await new Order({
        consumerId : user_firebase_id,
        productData : {pdtId : product_mongo_id , qty : prdtQty},
        status : "Order Placed",
        date: {
                dateOfOrder: Date.now(),
                dateOfDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
        },
        deliveryAddress : delivery_address,
        orderTotal : order_total_price
    }).save()

    const updatedUserDocument = await User.findOneAndUpdate(
        {userAuthId : user_firebase_id},
        {$push: { orders: newSingleOrder._id }},
        {new : true}
    )
    res.send(updatedUserDocument)
}

const deleteOrder = async (req,res) => {
    const  { order_id } = req.params
    const  { user_auth_id } = req.body
    const updatedUserDoc = await User.findOneAndUpdate({userAuthId : user_auth_id} , {
    // pull / remove order from current session user's document
        $pull : {orders : order_id},
        }, 
        {new : true}
    )
    await Order.findByIdAndDelete(order_id)
    res.send(updatedUserDoc)
}

const getRecentProductOrderCount = async (req, res) => {
    try {
        const { product_id } = req.params;
        
        // Query with dot notation and date range filtering
        // Count the documents matching the criteria
        const twoMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);

        const count = await Order.countDocuments({
            "productData.pdtId": product_id,
            "date.dateOfOrder": { 
                $gte: twoMinutesAgo,
                $lte: Date.now()
            }
        });



       res.status(200).json({ count });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserOrderDetails = async(req,res) => {
    const { values , orderId , product_details } = req.body
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {   
            productData : {
                pdtId : product_details._id,
                qty : values.qty
            },
            deliveryAddress : values.deliveryAddress,
            orderTotal : product_details.price*values.qty
        },
        {new : true}
    )
    res.send(updatedOrder)
}




export {
    createOrdersFromCart ,
    createSingleOrder,
    deleteOrder,
    getRecentProductOrderCount,
    updateUserOrderDetails
}

             

