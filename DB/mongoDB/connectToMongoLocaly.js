const mongoose = require('mongoose');
const chalk = require('chalk');

const connectToMongoLocaly = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodeServer")
        console.log(chalk.bgGreen.black("Connected To MongoDb Localy DB!"));

    } catch (error) {
        console.log(chalk.bgRed.red(error.message));


    }

}



module.exports = connectToMongoLocaly;