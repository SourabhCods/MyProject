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

             

