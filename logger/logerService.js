const morganLoger = require("./loger/morganService");
const config = require("config");

const loger = config.get("LOGGER");


const logerMiddlewer = () => {
    if (loger === "morgan") {
        return morganLoger;
    }
}


module.exports = logerMiddlewer;