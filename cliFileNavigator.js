const fs = require('fs/promises');
const {lstatSync} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path')

const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: null,
    })
    .argv;
console.log(options);
console.log(process.cwd());

let currentDirectory = options.d;

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(filename => new ListItem(path.join(currentDirectory, filename), filename));
    if (currentDirectory.length > 3) {
        items.unshift(new ListItem(path.dirname(currentDirectory), 'back'));
    }

    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        currentDirectory = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8')

        if (options.p == null) {
            console.log('null', data)
        } else {
            const regExp = new RegExp(options.p, 'img');
            console.log('not null', data.match(regExp))
        }
    }
}

run();