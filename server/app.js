import express from 'express'
import productRouter from '../server/routes/product.js'
import userRouter from '../server/routes/user.js'
import mongoose from 'mongoose';
import cors from 'cors'
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


app.use('/products' , productRouter) 
app.use('/user' , userRouter)

app.listen(3000,() => {
    console.log('server is running on port 3000')
})