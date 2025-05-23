import express from 'express'
import productRouter from '../server/routes/product.js'
import userRouter from '../server/routes/user.js'
import orderRouter from '../server/routes/order.js'
import mongoose from 'mongoose';
import cors from 'cors'
import Razorpay from 'razorpay'
import Order from "./models/order.js";
import crypto from 'crypto'
const app = express()

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests

main()
.then(res => console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/meesho');
}

const razorpay = new Razorpay({
  key_id: "rzp_test_nWZ781DMokiQyJ"	,
  key_secret: "yGqKoEC8l5TMn6Ln8TqHK5uc",
});

// Create an order
app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise (e.g., 100 INR = 10000 paise)
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order)
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
app.post("/verify-payment", (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const generated_signature = crypto
  .createHmac("sha256", "yGqKoEC8l5TMn6Ln8TqHK5uc")
  .update(`${order_id.trim()}|${payment_id.trim()}`)
  .digest("hex");

  if (generated_signature === signature) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use('/products' , productRouter) 
app.use('/user' , userRouter)
app.use('/order' , orderRouter)


app.listen(3000,() => {
    console.log('server is running on port 3000')
})
// export default io