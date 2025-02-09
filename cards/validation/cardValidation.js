const joiValidateCard = require("./joi/joiValidationCard");
const config = require("config");

const validator = config.get("VALIDATION");

const ValidateCard = (card) => {
    if (validator === "Joi") {
        const { error } = joiValidateCard(card);
        if (error) {
            return error.details[0].message;
        }

        return "";

    }
}

module.exports = ValidateCard;