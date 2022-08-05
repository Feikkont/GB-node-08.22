import colors from 'colors';
import inquirer from 'inquirer';

let arr = [];
let colorFlag = 1
const inputValidate = (input) => {
    if (+input == input) {
        // Pass the return value in the done callback
        // console.log(typeof +input)
        return true;
    } else {
        console.log(colors.blue('Нужно ввести число'));
        return false;
    }
}

const colorsObj = {
    1: 'green',
    2: 'yellow',
    3: 'red'
}

inquirer.prompt([
    {
        name: 'startNumber',
        message: 'Введите стартовое число: ',
        validate: inputValidate
    },
    {
        name: 'finishNumber',
        message: 'Введите конечное число: ',
        validate: inputValidate
    },
])
    .then(({startNumber, finishNumber}) => {
        nextPrime:
            for (let i = +startNumber; i <= +finishNumber; i++) { // Для всех i...
                for (let j = 2; j < i; j++) { // проверить, делится ли число../2
                    if (i % j == 0) continue nextPrime; // не подходит, берём следующее
                }
                if (i > 1) {
                    console.log(colors[colorsObj[colorFlag]](i))
                    arr.push(i)
                    if (colorFlag < 3) {
                        colorFlag++
                    } else {
                        colorFlag = 1
                    }
                }
            }
        if (!arr.length) {
            console.log(colors.red('простых чисел в диапазоне нет'))
        }

        // Use user feedback for... whatever!!
        // console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log('if', error)
            // Prompt couldn't be rendered in the current environment
        } else {
            console.log('if', error)
            // Something else went wrong
        }
    });
