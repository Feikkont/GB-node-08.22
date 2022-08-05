import {formatDuration, monthsToYears, parse, getTime} from 'date-fns'
import inquirer from 'inquirer';
import colors from "colors";

function getTimeRemaining(endtime) {
    const t = endtime - new Date().getTime();

    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const months = Math.floor(t / (1000 * 60 * 60 * 24 * 30));
    const years = monthsToYears(months);

    return {
        'total': t,
        'years': years,
        'months': months,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function initializeClock(endtime) {
    function updateClock() {
        const t = getTimeRemaining(endtime);
        console.clear() //очищаем консоль
        if (t.total <= 60000) {
            console.log(colors.red(formatDuration(t))) // выводим таймер
        } else {
            console.log(colors.green(formatDuration(t))) // выводим таймер
        }
        if (t.total <= 0) {
            clearInterval(timeinterval);
            console.clear() //очищаем консоль
            console.log(colors.yellow('Время истекло'))
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

inquirer.prompt([{
    name: 'timer', message: 'Введите дату в формате dd-MM-yyyy HH-mm-ss: ',
}])
    .then(({timer}) => {
        const deadline = getTime(parse(timer, 'dd-MM-yyyy HH-mm-ss', new Date()))
        initializeClock(deadline);
    })
    .catch((error) => {
        console.log(error)
    });
