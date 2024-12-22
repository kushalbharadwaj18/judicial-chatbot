import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chat.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', chatRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.log("Connection Unsuccessful");
}); 
app.listen(3000, () => {
    console.log('Server Running');
});