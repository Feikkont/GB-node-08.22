#!C:\Program Files\nodejs\node.exe
import fs from 'fs'
import readline from "readline";
import * as path from "path";
import inquirer from "inquirer";

const executeDir = process.cwd()

const generateFile = () => {
    const ACCESS_LOG = './access.log';

    const writeStreamAccessLog = fs.createWriteStream(ACCESS_LOG, {
            encoding: "utf-8",
            flags: 'a', //флаг - дозаписываем в файл
        }
    )
    console.log('Генерируем файл 100мб')
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
            await ipLogGen()
        } else {
            writeStreamAccessLog.end() //закрываем стрим
            console.log('Генерация завершена')
        }
    }
    //проверяем есть ли файл
    fs.stat(ACCESS_LOG, function (err, stat) {
        if (err == null) {
            fs.lstatSync(ACCESS_LOG).size <= 104857600 ? ipLogGen() : console.log("Файл 100мб")
        } else if (err.code === 'ENOENT') {
            ipLogGen()
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

const fileSearch = () => {

    const fileFilter = (fileOdDir) => fs.lstatSync(fileOdDir).isFile()
    const list = fs.readdirSync('./').filter(fileFilter);

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
            const regExp = /^\S+/gmi;
            if (line.match(regExp)[0] == ip) {
                writeStreamFilteredIp.write(line + '\n')
            }
        })
        console.log(`Файл с именем ${ip}_requests.log создан`)
    })

}

const action = [
    'generate',
    'search'
]

inquirer.prompt([
    {
        name: 'action',
        type: 'list',
        message: 'Выберете файл для чтения',
        choices: action,
    },
]).then(({action}) => {
    switch (action) {
        case 'generate':
            generateFile();
            break;

        case 'search':
            fileSearch();
            break;
        default:
            console.log('Приложение закрыто')
    }
})