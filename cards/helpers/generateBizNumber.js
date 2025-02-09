const { createError } = require("../../utils/handelError");
const Card = require("../models/mongoDb/Card")
const _ = require('lodash');

const generateBizNum = async () => {

    let cardsCount = await Card.countDocuments();


    if (cardsCount === 8_999_999) {

        const error = new Error("You Have Reached The Maximum Card Count In Your System!");
        error.status = 507;
        return createError("Mongoose: ", error);
    }


    let random;

    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await bizNumberExist(random));

    return random;

};

const bizNumberExist = async (bizNum) => {


    try {
        const bizNumber = await Card.findOne({ bizNum });
        return Boolean(bizNumber)
    } catch (error) {


        error.status = 500;
        return createError("Mongoose: ", error);


    }



}

module.exports = { generateBizNum };