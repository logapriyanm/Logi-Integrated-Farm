import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from "./routes/adminRoutes.js";


const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary()

// Middlewares

app.use(express.json())
app.use(cors())



app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use("/api/admin", adminRouter);



// Routes
app.get('/', (req, res) => {
  res.send('Api working!')
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});