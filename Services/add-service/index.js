import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import addRoute from './routes/add.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected successfully!');
    } catch (error) {
        console.log(error);
    }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', addRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';

    return res.status(errorStatus).send(errorMessage);
});

app.listen(5000, () => {
    connect();
    console.log('Backend server is running!');
});
