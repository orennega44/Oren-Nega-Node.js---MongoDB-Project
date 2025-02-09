const morgan = require("morgan");
const currentTime = require("../../utils/timeHelper");
const chalk = require("chalk");


const morganLoger = morgan(function (tokens, req, res) {
    const { year, month, day, hours, minuts, seconds } = currentTime();

    let message = [

        `[${year}/${month}/${day} -- ${hours}:${minuts}:${seconds}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');

    if (res.statusCode >= 400) {
        return chalk.redBright(message);
    } else {
        return chalk.cyanBright(message)
    }
})


module.exports = morganLoger;