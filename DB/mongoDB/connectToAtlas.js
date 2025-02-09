const mongoose = require('mongoose');

require("dotenv").config();
const connectionStringForAtlas = process.env.ATLAS_DB_CONECTION;

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected To MongoDB In Atlas");

    } catch (error) {
        console.error("Could not connect to MongoDB In Atlas", error);
    }
};

module.exports = connectToAtlasDb;