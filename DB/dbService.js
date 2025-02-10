const connectToAtlasDb = require("./mongoDB/connectToAtlas");
const connectToLocalDb = require("./mongoDB/connectToMongoLocaly")
const config = require('config');

const ENVIRONMENT = config.get("ENVIRONMENT");



const connectToDB = async () => {

    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    }

    if (ENVIRONMENT === "production") {
        await connectToAtlasDb();
    }



}

module.exports = connectToDB;