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
                console.log(req.query.open)
                res.send(data.toString())
            }
        })
    } else {
        res.json(getFiles(currentDirectory))
    }
})

app.listen(4000, () => console.log('Server been started http://localhost:4000'));