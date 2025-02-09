const config = require("config");
const { createError } = require('../../utils/handelError');
const Card = require('../models/mongoDb/Card')
const DB = config.get("DB");


const getCards = async () => {

    if (DB === "MongoDB") {
        try {
            let cards = await Card.find({})
            
            return cards;
        } catch (error) {

            return createError("DataBase: ", error);
        }
    }

    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);

}


const getMyCards = async (userId) => {

    if (DB === "MongoDB") {

        try {
            let cards = await Card.find({ user_id: userId });
            return cards;
        } catch (error) {
            return createError("DataBase: ", error);
        }
    }

    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);

}



const getCard = async (cardId) => {

    if (DB === "MongoDB") {
        try {
            let card = await Card.findById(cardId);
            return card;
        } catch (error) {
            return createError("DataBase: ", error);
        }
    }
    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);


}


const createCard = async (newCard) => {
    if (DB === "MongoDB") {
        try {

            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {

            return createError("Mongoose: ", error);
        }
    }

    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);

}


const updateCard = async (cardId, newCard) => {

    if (DB === "MongoDB") {

        try {
            let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true })
            return card;
        } catch (error) {
            return createError("DataBase: ", error);
        }
    }
    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);

}


const likeCard = async (cardId, userId) => {

    if (DB === "MongoDB") {

        try {
            let card = await Card.findById(cardId);

            if (!card) {
                const error = new Error("this card is not found in the data base")
                error.status = 404
                return createError("Mongoose: ", error);
            }

            if (card.likes.includes(userId)) {
                let newLikeArr = card.likes.filter((id) => { id != userId })
                card.likes = newLikeArr;

            } else {

                card.likes.push(userId);
            }

            await card.save();
            return card;


        } catch (error) {
            return createError("DataBase: ", error);
        }
    }
    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);
}


const deleteCard = async (cardId) => {

    if (DB === "MongoDB") {

        try {
            let card = await Card.findByIdAndDelete(cardId);

            return card;

        } catch (error) {
            return createError("DataBase: ", error);
        }
    }
    const error = new Error("Ther Is No Other DataBase For This Request");
    error.status = 500;
    return createError("DataBase: ", error);



}


module.exports = { createCard, getCards, getCard, getMyCards, updateCard, likeCard, deleteCard };











