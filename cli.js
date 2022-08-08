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

const writeStreamAccessLog = fs.createWriteStream(ACCESS_LOG, {
        encoding: "utf-8",
        flags: 'a', //флаг - дозаписываем в файл
    }
)

//Генерируем файл 100мб
const writingFunc = async (query) => new Promise((resolve, reject) => writeStreamAccessLog.write(query, resolve));

const ipLogGen = async () => {
    let ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
    let arr = [
        `${ip} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
        `${ip} - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`
    ];
    for (const item of arr) {
        await writingFunc(item + '\n')
    }
    if (fs.lstatSync(ACCESS_LOG).size <= 104857600) {
        ipLogGen()
    } else {
        writeStreamAccessLog.end() //закрываем стрим
        rl.close()
    }
}
fs.lstatSync(ACCESS_LOG).size <= 104857600 ? ipLogGen() : console.log("Файл 100мб")

writeStreamAccessLog.end() //закрываем стрим

const fileFilter = (fileOdDir) => fs.lstatSync(fileOdDir).isFile()
//получаем список всего что есть в папке в массив
// const list = fs.readdirSync('./').filter(fileFilter);
const list = fs.readdirSync('./');

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'Выберете файл для чтения',
        choices: list,
    },
    {
        name: 'ip',
        message: 'Введите Ip',
    }
]).then(({fileName, ip}) => {
    const fullFilePath = path.join(executeDir, fileName)
    const readStream = fs.createReadStream(fullFilePath, {
        encoding: 'utf-8',
    })
    const writeStreamFilteredIp = fs.createWriteStream(`${ip}_requests.log`, {
            encoding: "utf-8",
            flags: 'a', //флаг - дозаписываем в файл
        }
    )
    const readInterface = readline.createInterface({
        input: readStream,
    });
    readInterface.on('line', (line) => { //chunk - часть данных
        regExp = /^\S+/gmi;
        if (line.match(regExp)[0] == ip) {
            writeStreamFilteredIp.write(line + '\n')
        }

    })
})
// console.log(`Файл с именем ${ip}_requests.log создан`)

// writeStreamFilteredIp.end() //закрываем стрим

// rl.close()
