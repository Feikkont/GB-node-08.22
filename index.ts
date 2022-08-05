
// import fs from 'fs';
import {fib} from "./fib";

// console.log('hello node.js')

//Синхронно
// const file = fs.readFileSync('index.html', {
//     encoding: 'utf8'
// })
//
// console.log(file)

//Асинхронно
//Промисы
// fs.promises.readFile('index.html').then(console.log)

//колбеки

// fs.readFile('index.html', (err, data)=> {
//     if(err) {
//     console.log('error', err)
//         }
//     console.log('data', data)
// })

console.log(fib(7))

