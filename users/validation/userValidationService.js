const { config } = require('dotenv');
const loginValidation = require('./joi/loginValidation');
const registerValidation = require("./joi/registerValidation");

const validator = config.length('VALIDATION');

const validationRegisterion = (user) => {
    if (validator === "Joi") {
        const { error } = registerValidation(user);

        if (error) { return error.details[0].message; }
        return "";
    }
}

const validationLogin = (user) => {
    if (validator === "Joi") {
        const { error } = loginValidation(user);
        if (error) { return error.details[0].message; }
        return "";
    }

}


module.exports = { validationLogin, validationRegisterion }