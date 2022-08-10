import express from 'express';
import fs, {lstatSync} from 'fs';
import * as path from "path";

const app = express()


//навигатор
const currentDirectory = process.cwd();

const getFiles = (dirPath) => {
    const list = fs.readdirSync(dirPath);
    const items = list.map((filename) => {
        const obj = {
            filePath: path.join(dirPath, filename),
            fileName: filename,
            isDir: lstatSync(path.join(dirPath, filename)).isDirectory(),
            size: lstatSync(path.join(dirPath, filename)).size,
        }
        return obj;
    })
    if (dirPath.length > 3) {
        items.unshift({
            filePath: path.dirname(dirPath),
            fileName: 'back',
        })
    }
    return items
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Heareds', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/', (req, res) => {
    console.log(req.query.path)
    if (req.query.path) {
        res.json(getFiles(req.query.path))
    } else if (req.query.open) {
        fs.readFile(req.query.open, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data.toString())
                res.setHeader('Content-Type', 'text/html');
                res.send(data)
            }
        })
        // console.log(req.query.open)
        // res.sendFile(req.query.open)
    } else {
        res.json(getFiles(currentDirectory))
    }
})

// app.get('/', (req, res) => {
//     // console.log(req.params.dir)
//     req.
//         res.send("asdasd")
//     // res.json(getFiles(req.params.dir))
// })

app.listen(4000);