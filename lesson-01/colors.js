import colors from 'colors';
import readline from 'readline';

// console.log(colors.green('hello'))
// const args = process.argv.slice(2)
// const [name, age] = args
// // console.log(args)
// console.log(colors.green('hello ' + name))
// console.log(colors.red('age ' + age))

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('what your name? ', (answer) => {
//     //TODO log the answer in database
//     console.log(`thank: ${answer}`);
//     rl.close();
// });

rl.on('line', (input) => {
    console.log(`Recived: ${input}`);
    if (input === 'exit') {
            rl.close();
    }
})