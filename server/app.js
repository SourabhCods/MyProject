import express from 'express'
// import http from 'http'
// import { Server } from 'socket.io'
import productRouter from '../server/routes/product.js'
import userRouter from '../server/routes/user.js'
import orderRouter from '../server/routes/order.js'
import mongoose from 'mongoose';
import cors from 'cors'
import Razorpay from 'razorpay'
import Order from "./models/order.js";
import crypto from 'crypto'
const app = express()
// const server = http.createServer(app);
// const io = new Server(server);

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests

main()
.then(res => console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/meesho');
}

// // Socket.IO connection
// io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // On Client disconnect
//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// });

const razorpay = new Razorpay({
  key_id: "rzp_test_M7A2EY1fdxHqUb"	,
  key_secret: "c1KO7EOOmP3ZVJVsyLzJOaDq",
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
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
app.post("/verify-payment", (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const hmac = crypto.createHmac("sha256", "WQ4zbcEJQxVmLtdSnDSU01dW");
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
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