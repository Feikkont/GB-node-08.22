import express from 'express';

const app = express()
const executeDir = process.cwd()

app.get('/', (req, res) => {
    res.send('Hellow Word')
})

//Обработка запросов http://localhost:3000/hello?name=Vasya
app.get('/hello', (req, res) => {
    res.send('Hello' + req.query.name)
})

//http://localhost:3000/hello/790
app.get('/hello/:id', (req, res) => {
    res.send('hello ' + req.params.id)
})

app.get('/person', (req, res) => {
    // res.send({name:'ivan'})
    res.json({name: 'ivan'})
})

app.get('/file', (req, res) => {
    //нужно указать путь до файла
    res.sendFile(`${executeDir}/index.html`)

    //Можно в опциях указать руут папку или полностью путь указать
    // res.sendFile(`/index.html`, {root: executeDir})
    // res.sendFile(`/index.html`, {root: __dirname})

})

app.get('/status', (req, res) => {
    res.sendStatus(204)
})

app.listen(3000);