import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import ChatRouter from './routes/chats.js';
import MessagesRouter from './routes/messages.js'
// @ts-ignore
import AuthRouter from './routes/auth.js'
import {errorMiddleware} from "./middlewares/error-middleware.js";
import onConnection from './socketio/onConnection.js'
import mongoose from "mongoose";
import {Server} from 'socket.io'
import {createServer} from 'http'

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

try {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('mongose connected')
} catch (error) {
    error => console.log(error)
}

const server = createServer(app)

const io = new Server(server, {
    cors: process.env.CLIENT_URI,
    serveClient: false
})

io.on('connection', (socket) => {
    onConnection(io, socket)
})

server.listen(PORT, () => {
    console.log(`Server has been started http:localhost:${PORT}`)
})