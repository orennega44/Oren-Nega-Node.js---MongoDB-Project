const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooshValidation");


const Name = new mongoose.Schema({

    first: DEFAULT_VALIDATION,
    middle: {

        ...DEFAULT_VALIDATION,
        require: false,
        minLength: 0
    },
    last: DEFAULT_VALIDATION
})


module.exports = { Name };


