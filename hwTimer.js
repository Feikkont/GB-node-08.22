import { formatDuration, monthsToYears, daysToWeeks, parse, getTime, format } from 'date-fns'
import inquirer from 'inquirer';
import colors from "colors";


function getTimeRemaining(endtime) {
    const t = endtime - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const weeks = daysToWeeks(days)
    const months = Math.floor(t / (1000 * 60 * 60 * 24*30));
    const years = monthsToYears(months);


    return {
        'total': t,
        'years': years,
        'months': months,
        // 'weeks': weeks,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function initializeClock(endtime) {
       function updateClock() {
        const t = getTimeRemaining(endtime);
           console.log(formatDuration(t))git
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}
// console.log(result)
// var test = getTime(result)
// console.log(test)
// console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss"))
//
// var deadline = new Date(Date.parse(new Date()) + 32*24 * 60 * 60 * 1000); // for endless timer
// console.log('deadline', deadline)

inquirer.prompt([
    {
        name: 'timer',
        message: 'Введите дату в формате dd-MM-yyyy HH-mm-ss: ',
    }
])
    .then(({timer}) => {
        const deadline = getTime(parse(timer, 'dd-MM-yyyy HH-mm-ss', new Date()))

        console.log('timer',deadline)
        initializeClock(deadline);
        // Use user feedback for... whatever!!
        // console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
