// import fs from 'fs'
// import readline from "readline";
// import yargs from "yargs";
const yargs = require('yargs');
const fs = require('fs');
const readline = require('readline')
const path = require('path')

//принимаем аргументы, первые 2 откидываем
const [filePath] = process.argv.slice(2);
// console.log('filePath: ', filePath)

// fs.readFile(filePath, 'utf-8', (err, data) => {
//     if (err) {
//         console.log('error: ', err)
//         return
//     }
//     console.log('data', data)
// })

//yargs
//создаем опции которые отвечают за ключи и вопросы в приложении
// const options = yargs
//     .usage('Usage: -p <path to file>')
//     .options('p',{
//         alias:'path',
//         describe: 'path to file',
//         type: 'string',
//         demandOption: true,
//     }).argv
//
// // console.log(options)
// fs.readFile(options.p, 'utf-8', (err, data) => {
//     if (err) {
//         console.log('error: ', err)
//         return
//     }
//     console.log('data', data)
// })

//вопрос-ответ

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
// //колбэк хел
// rl.question('Введите путь до файлв: ', (filePath) => {
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         rl.question('Введите кодировку файла: ', (encode) => {
//             fs.readFile(filePath, encode, (err, data) => {
//                 if (err) {
//                     console.log('error: ', err)
//                 }
//                 console.log('data', data)
//                 rl.close()
//             })
//         })
//     })
// })

//на промисах
// const question = async (query) => new Promise((resolve, reject) => rl.question(query, resolve));
//
// //написали самовызывающуюся асинхронную функцию чтобы в ней использовать await
// (async () => {
//     const filePath = await question('Введите путь до файла: ');
//     const encode = await question('Введите кодировку файла: ');
//     fs.readFile(path.join(__dirname, filePath), encode, (err, data) => {
//         if (err) {
//             console.log('error: ', err)
//         }
//         console.log('data', data)
//     })
//     rl.close()
// })()


//cwd возвращает путь откуда запустили файл
const executeDir = process.cwd()

//inquirer