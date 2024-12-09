import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', userRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.log("Connection Unsuccessful");
}); 
app.listen(3000, () => {
    console.log('Server Running');
});