const mongoose = require('mongoose');
const express = require('express');
const connectToMongoLocaly = require('./DB/mongoDB/connectToMongoLocaly');
const router = require('./router/router')
const coreMiddlewar = require('./middlewars/cors');
const chalk = require('chalk');
const logerMiddlewer = require('./logger/logerService');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.static("./public"));
app.use(coreMiddlewar);
app.use(express.json());
app.use(logerMiddlewer());
app.use(router);

app.use((err, req, res, next) => {
    const message = err || "Internal Server Error!";
    return handleError(res, 500, message)

});




app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}!`);
    connectToMongoLocaly();

})




