const chalk = require("chalk");


const createError = (validetor, error) => {

    error.message = `${validetor} Error: ${error.message}`;


    error.status = error.status || 400;

    throw new Error(error);
}

const handleError = (res, status, message = "") => {

    console.log(chalk.bgRedBright.white(message));
    return res.status(status).send(message);


}

module.exports = { createError, handleError };