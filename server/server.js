import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectdb from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoutes.js'
import hotelRouter from './routes/hotelRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import roomRouter from './routes/roomRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'

connectdb();
connectCloudinary();

const app = express()
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,https://hostel-hub-un5n.vercel.app').split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));





// Middleware
app.use(express.json())
app.use(clerkMiddleware())


app.use("/api/clerk", clerkWebhooks);
app.get('/',(req,res)=> res.send("API is working"))


app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))