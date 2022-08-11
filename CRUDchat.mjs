import express from 'express';
import jsonParser from 'body-parser';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/conversations', (req, res)=>{
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.send(data.conversations)
});

app.get('/conversations/:room', (req, res)=>{
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.send(data.conversations[req.params.room])
});

app.post('/conversations', (req, res) => {
     const data = JSON.parse(fs.readFileSync('db.json'));
    data.conversations[req.body.name] = req.body
    fs.writeFile('db.json', JSON.stringify(data),error => console.log("Done!"))
    // res.sendStatus(200, 'OK')
    res.send('welcome, ' + req.body)
})


app.listen(3333, () => console.log('Server been started http://localhost:3333'))




// import jsonServer from 'json-server';
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()
//
// server.use(middlewares)
// server.use(router)
// server.listen(4444, () => {
//     console.log('JSON Server is running')
// })