import express from 'express';
// import bodyParser from "body-parser";
import ChatRouter from './routes/chats';
import MessagesRouter from './routes/messages';
import AuthRouter from './routes/auth';

import mongoose from "mongoose";
import 'dotenv/config'
import {errorMiddleware} from "./middlewares/error";
import {verifyToken} from "./middlewares/tokenVerify";

const URI = process.env.MONGODB_URI as string

mongoose.connect(URI).then(() => console.log("mongose connected")).catch(error => console.log(error));

const app = express();

// Чтобы парсить json  на сервере необходимо поставить body-parsee и обюявить 2 мидлвары, одна для json, другая для форм
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended:false}))
// // parse application/json
// app.use(bodyParser.json())
//body-parser втсроен в express
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/status', (req, res) => {
    res.send("OK ")
})

app.use('/chats', ChatRouter);
app.use('/messages', MessagesRouter);
app.use('/', AuthRouter);


// мидлвара для авторизации работает только ля одного роута
app.get('/profile', verifyToken, (req, res) => {
    res.send('Im secured')
});
//а так для всех роутов что ниже
// app.use('/', verifyToken);
// app.get('/profile', (req, res) => {
//     res.send('Im secured')
// });


app.use(errorMiddleware)

// обработка 404 ошибки если не найден путь
app.all("*", (_, res) => {
    res.status(404).json({error: 404})
})

app.listen(process.env.PORT || 3333, () => console.log('Server been started http://localhost:3333'))
