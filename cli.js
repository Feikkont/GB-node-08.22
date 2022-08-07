#!C:\Program Files\nodejs\node.exe
// import fs from 'fs'
// import readline from "readline";
// import * as path from "path";
// import inquirer from "inquirer";
// import yargs from "yargs";
const yargs = require('yargs');
const fs = require('fs');
const readline = require('readline')
const path = require('path')
const inquirer = require('inquirer')

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
//массив для choices

//фильтруем массив
//lstatSync информация о файле(размер и т.д.) .isFile() проверяет файл это или нет
// const fileFilter = (fileOdDir) => fs.lstatSync(fileOdDir).isFile()
// //получаем список всего что есть в папке в массив
// const list = fs.readdirSync('./').filter(fileFilter);
//
//
//
// // console.log(list)
//
// inquirer.prompt([
//     {
//         name: 'fileName',
//         type: 'list',
//         message: 'Выберете файл для чтения',
//         choices: list,
//     }
// ]).then(({fileName}) => {
// const fullFilePath = path.join(executeDir, fileName)
//     fs.readFile(fullFilePath, "utf-8", (err, data) => {
//         if (err) {
//             console.log('error: ', err)
//         }
//         console.log('data', data)
//     })
// })
// console.log(process.argv)
const ACCESS_LOG = './access.log';

const writeStream = fs.createWriteStream(ACCESS_LOG, {
        encoding: "utf-8",
        flags: 'a', //флаг - дозаписываем в файл
    }
)


const ipLogGen = async () => {
    let ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
    return [
        `${ip} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
        `${ip} - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`
    ]
}

// while (fs.lstatSync(ACCESS_LOG).size <= 104857600) {
// }

(async ()=>{
    for (let i=0 ; i <= 20; i++) {
        ipLogGen().forEach((logString) => {
        await writeStream.write(logString + '\n')
    })
    console.log('in cicle',fs.lstatSync(ACCESS_LOG).size)

}
})()

// for (let i=0 ; i <= 20; i++) {
//     ipLogGen().forEach((logString) => {
//         writeStream.write(logString + '\n')
//     })
//     // console.log('in cicle',fs.lstatSync(ACCESS_LOG).size)
// }


writeStream.end() //закрываем стрим
console.log('last', fs.lstatSync(ACCESS_LOG).size)


// console.log('size: ', fs.lstatSync(ACCESS_LOG).size)
// console.log(fs.lstatSync(ACCESS_LOG).size <= 104857600)

rl.close()
