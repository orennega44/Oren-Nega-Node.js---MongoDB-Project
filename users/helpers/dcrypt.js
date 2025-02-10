const dcrypt = require("bcryptjs");


const generatePassword = (password) => dcrypt.hashSync(password, 10);



const comparePassword = (password, cryptPassword) => {
    return dcrypt.compareSync(password, cryptPassword);

}

module.exports = { generatePassword, comparePassword };