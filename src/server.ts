import express from 'express';
import bodyParser from "body-parser";

import ChatRouter from './routes/chats';
import MessagesRouter from './routes/messages'


const app = express();

// Чтобы парсить json  на сервере необходимо поставить body-parsee и обюявить 2 мидлвары, одна для json, другая для форм
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// parse application/json
app.use(bodyParser.json())

 app.get('/status', (req, res) => {
    res.send("OK ")
})

app.use('/chats', ChatRouter);
app.use('/messages', MessagesRouter)


app.listen(3333, () => console.log('Server been started http://localhost:3333'))
