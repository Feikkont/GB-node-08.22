import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/conversations', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.send(data.conversations)
});

app.get('/conversations/:room', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.send(data.conversations[req.params.room])
});

app.post('/conversations/:new_room', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    data.conversations[req.params.new_room] = req.body
    fs.writeFile('db.json', JSON.stringify(data), error => console.log("Done!"))
    res.sendStatus(201, 'Created')
})

app.delete('/conversations/:room', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    delete data.conversations[req.params.room]
    fs.writeFile('db.json', JSON.stringify(data), error => console.log("Done!"))
    res.sendStatus(204, 'No Data')
})

app.put('/conversations/:room', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    data.conversations[req.params.room] = req.body
    fs.writeFile('db.json', JSON.stringify(data), error => console.log("Done!"))
    res.sendStatus(204, 'No Data')
})

app.patch('/conversations/:room', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    const arrBodyKeys = Object.keys(req.body)
    console.log(Object.keys(req.body))
    arrBodyKeys.forEach((el) => {
        data.conversations[req.params.room][el] = req.body[el]
    })
    fs.writeFile('db.json', JSON.stringify(data), error => console.log("Done!"))
    res.sendStatus(204, 'No Data')
})

app.listen(3333, () => console.log('Server been started http://localhost:3333'))
