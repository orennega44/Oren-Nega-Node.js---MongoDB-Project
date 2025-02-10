const morganLoger = require("./loger/morganService");
const config = require("config");

const loger = config.get("LOGGER");


const logerMiddlewer = () => {
    if (loger === "morgan") {
        return morganLoger;
    }

    return (req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`); 
        next();
    };
}


module.exports = logerMiddlewer;