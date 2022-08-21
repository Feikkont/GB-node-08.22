import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import ChatRouter from './routes/chats.js';
import MessagesRouter from './routes/messages.js'
// @ts-ignore
import AuthRouter from './routes/auth.js'
import {errorMiddleware} from "./middlewares/error-middleware.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3333;
const URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
//CORS для взаимодействия с локальным сервером
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URI
}));

app.get('/status', (req, res) => {
    res.send("OK ")
})

app.use('/chats', ChatRouter);
app.use('/messages', MessagesRouter);
app.use('/', AuthRouter);

app.use(errorMiddleware)
const start = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("mongose connected")).catch(error => console.log(error));

        app.listen(PORT, () => console.log('Server has been started http:localhost:3333'))
    } catch (e) {
        console.log(e)
    }
}
start()
