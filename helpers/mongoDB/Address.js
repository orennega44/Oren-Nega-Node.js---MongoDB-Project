const { mongoose } = require('mongoose');
const { DEFAULT_VALIDATION } = require('./mongooshValidation');


const Address = new mongoose.Schema({

    state: {
        type: String,
        maxLength: 256,
        trim: true
    },
    country: DEFAULT_VALIDATION,
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    HouseNumber: {
        type: String,
        require: true,
        min: 1
    },
    zipoCode: {
        type: Number,
        default: 0
    }

})

module.exports = { Address };

