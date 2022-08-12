// /users/create
// /user/read
// //user/delete
// /user/update

// /users - GET
// /users - POST
// /users/:id - DELETE
// /users?query - PATH / PUT

import http from 'http';
// // import url from 'url';
import fs from 'fs';

import cluster from "cluster";
import os from 'os';

// создаем сервер. CreateServer принимает 2 аргумента. 1 аргумент функция которая передает запрос 2. функция которая возвращает ответ
// const server = http.createServer((req, res) => {
//     // res.write('hello');
//     // res.end('hello 4')
//
//     // console.log('url: ', req.url ) // читаем URL с которого пришел запрос
//     // console.log('method: ', req.method) // читаем метод запроса
//     // console.log('headers: ', req.headers) // читаем заголовки запроса
//
//     //вставляем заголовки
//     // res.setHeader('test-header', 'test')
//     // изменение статуса ответа. writeHead 3 аргуметом принимает заголовки для ответа
//     // res.writeHead(200, 'OK!', {
//     //     'test-header': 'test',
//     // })
//     //
//     // res.end('end')
//
//     // проверяем по какому url идет запрос и делаем ответ
//     // if (req.url === '/user') {
//     //     res.end('User found')
//     // } else {
//     //     res.writeHead(404, 'User not found', {
//     //         'test-header': 'test'
//     //     })
//     //     res.end('User not found ')
//     // }
//
//     // проверяем запросы по методу запроса
//     // if (req.method === 'GET') {
//     //     res.end('Hello')
//     // } else if (req.method === 'POST') {
//     //     res.writeHead(405, 'method not allowed')
//     //     res.end('method not allowed')
//     // }
//
//
//     //полезная нагрузка
//     // if (req.method === 'GET') {
//     //     if (req.url) {
//     //         const {query} = url.parse(req.url, true) //если передать труе, то ответ распарсится и данные положатся в объект
//     //         console.log(query)
//     //     }
//     //
//     //     res.end('Hello')
//     // } else if (req.method === 'POST') {
//     //     let data = '';
//     //     req.on('data', (chunk) => { data += chunk })
//     //     req.on('end', () => {
//     //         console.log('data', JSON.parse(data))
//     //         //Возвращаем ответ клиенту
//     //         res.writeHead(200, 'OK',{
//     //             'Content-Type': 'application/json', // добавляем в хедер тип контента JSON чтобы ответ был в формате JSON
//     //         })
//     //         res.end(data)
//     //     })
//     //
//     //
//     //     // res.writeHead(405, 'method not allowed')
//     //     // res.end('method not allowed')
//     // }
//
//     //передача файла
//
//     const file = fs.readFileSync('./index.html')
//
//     res.writeHead(200, 'OK', {
//         // 'Content-Type': 'text/plain' // как текст
//         'Content-Type': 'text/html' //как штмл
//     })
//     res.end(file)
// })
//
// // инициализируем порт который слушает сервер
// server.listen(5555, ()=> console.log('Server been started http://localhost:5555'))


//Оптимизация\многопоточность

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < os.cpus().length; i++) {
        console.log(`Forking process number ${i}`)

        cluster.fork()
    }
} else {

    console.log(`Worker ${process.pid} is running...`)

    const server = http.createServer((req, res) => {

        // setTimeout(() => {
        //     const file = fs.readFileSync('index.html');

            const readStream = fs.createReadStream('index.html')

            res.writeHead(200, 'OK', {
                'Content-Type': 'text/html'
            });

            console.log(`Send file for ${process.pid}`)
            readStream.pipe(res)
            // res.end(file);
        // }, 3000)
    })

    server.listen(5555, () => console.log('Server been started http://localhost:5555'))
}


