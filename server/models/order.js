
import {Schema , model} from 'mongoose'

const orderSchema = new Schema({
    consumerId : { type : String }, // curr user auth id from firebase
    productData : { // reference id from product model
        type : Object // order doc -> cart array -> [{pdtid : ref id from product doc , qtye : num}}]
    },
    status: { type: String , enum: ['Order Placed', 'Shipped', 'Dispatch', 'Delivered'] },
    date: {
        type: {
            dateOfOrder: Date,
            dateOfDelivery: Date
        },
    },
    deliveryAddress : {
        type : String
    }
    
})

const Order = model('Order' , orderSchema)
export default Order