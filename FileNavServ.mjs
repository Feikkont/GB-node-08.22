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
            filePath: dirPath,
            filename: filename,
            isDir: lstatSync(path.join(dirPath, filename)).isDirectory(),
            size: lstatSync(path.join(dirPath, filename)).size,
        }
        return obj;
    })
    if (dirPath.length > 3) {
        items.unshift({
            filePath: path.dirname(dirPath),
            filename: 'back',
        })
    }
    return items
}


app.get('/', (req, res) => {
    console.log(req.query.path)
    if (req.query.path) {
        res.json(getFiles(req.query.path))
    } else  {
        res.json(getFiles(currentDirectory))
    }
})

// app.get('/', (req, res) => {
//     // console.log(req.params.dir)
//     req.
//         res.send("asdasd")
//     // res.json(getFiles(req.params.dir))
// })

app.listen(3000);