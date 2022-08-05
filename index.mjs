import fs from 'fs'

//readFileSync читать файл в синхронном режиме
// const data = fs.readFileSync('./access.log', {encoding: 'utf-8'}) // меняем сразу кодировку в utf 8
// console.log('Синхронно читаем из файла', data)

const ACCESS_LOG = './access.log';

//readFile работает на промисах/ В колбек первым аргументом приходит ошибка(Error first)
// fs.readFile(ACCESS_LOG, 'utf-8', (err, data)=>{ //utf можно написать без encoding
//     console.log(data)
// })

const requests = [
    `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
    `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`
]

// writeFile записывает в файл
// // 1 арг - куда пишем, 2- что пишем, 3 - опции(кодировка и фалг), 4 колбек
// fs.writeFile(ACCESS_LOG, requests[0] +'\n', {encoding: 'utf-8', flag: 'ax'}, (err)=>{
//     if (err) {
//         console.log(err)
//     }
// })
//appendFile добавляет в файл данные
// fs.appendFile(ACCESS_LOG, requests[0] +'\n', {encoding: 'utf-8'}, (err)=>{
//     if (err) {
//         console.log(err)
//     }
// })

//Стримы
//чтение
// fs.ReadStream() //class
// fs.createReadStream()
// const readStream = fs.createReadStream(ACCESS_LOG, {
//     encoding: 'utf-8',
//     //autoClose // Когда прочитали файл стрим закрывается
//     //start //  с какого байта начать читение
//     //end // До какого байта читать
//     highWaterMark: 64, // по какому количеству байт будет происходить чтение
// })
//
// readStream.on('data', (chunk) => { //chunk - часть данных
//     console.log('chunk', chunk)
// })

//запись
// const writeStream = fs.createWriteStream(ACCESS_LOG,{
//     encoding: "utf-8",
//     flags: 'a', //флаг - дозаписываем в файл
//     }
// )
//
// requests.forEach((logString) => {
//     writeStream.write(logString + '\n')
// })
//
// writeStream.end() //закрываем стрим

// эмитация: если не оплачен аккаунт, то скрыть какие-то данные
const payedAccount = false;

const readStream = fs.createReadStream(ACCESS_LOG);
// Transform вид Duplex потока, который может изменять данные
const tStream = new Transform({
    transform(chunk, encoding, callback) {
        if (!payedAccount) {
            const transormed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[Hiddem IP]')
            this.push(transormed)
        } else {
            this.push(chunk)
        }
        callback()
    }
})


readStream.pipe(tStream).pipe(process.stdout)