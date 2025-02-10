const express = require('express');
const connectToDB = require('./DB/mongoDB/connectToMongoLocaly');
const loger = require('./serverLog/loggerMiddleware');
const router = require('./router/router')
const coreMiddlewar = require('./middlewares/cors');
const chalk = require('chalk');
const logerMiddlewer = require('./logger/logerService');
const { handleError } = require('./utils/handelError');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.static("./public"));
app.use(coreMiddlewar);
app.use(express.json());
app.use(logerMiddlewer());
app.use(router);
app.use(loger);

app.use((err, req, res, next) => {
    const message = err || "Internal Server Error!";
    return  handleError(res, 500, message)
});




app.listen(PORT,  async () => {
    console.log(chalk.bgCyanBright.black(`server connected to port ${PORT}!`) );
    await connectToDB();

    

})




