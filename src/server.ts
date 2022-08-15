import express from 'express';
import bodyParser from "body-parser";

import ChatRouter from './routes/chats';
import MessagesRouter from './routes/messages'
import mongoose from "mongoose";
import morgan from 'morgan';
import fs from 'fs';
import * as path from "path";

mongoose.connect('mongodb://localhost:27017/gb').then(() => console.log("mongose connected")).catch(error => console.log(error));

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))

// log all requests to access.log
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.send("OK ")
})

app.use('/chats', ChatRouter);
app.use('/messages', MessagesRouter)


app.listen(3333, () => console.log('Server been started http://localhost:3333'))
