import { Schema , model } from "mongoose";

const userSchema = new Schema({
    userAuthId : String,
    cartItems: [
    {
        pdtId: { type: Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number }
    }
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const User = model('User', userSchema)
export default User