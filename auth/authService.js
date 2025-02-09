const { verifyToken } = require("./providers/jwt");



const auth = (req, res, next) => {

    try {

        const tokenFromUser = req.header("x-auth-token");
        if (!tokenFromUser) {
            throw new Error("Please Login!");
        }

        const userInfo = verifyToken(tokenFromUser);


        if (!userInfo) {
            throw new Error("Unathorized User");
        }

        req.user = userInfo;
        return next();

    } catch (error) {
        return new Error(error.message);
    }


}

module.exports = auth;