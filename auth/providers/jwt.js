const jwt = require("jsonwebtoken");
require("dotenv").config();


const secretWord = process.env.SECRED_WORD;




const generateAuthToken = (user) => {

    const payload = {
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
    }

    let token = jwt.sign(payload,secretWord);

    return token;
}


const verifyToken = (tokenFromUser)=>{

    try {
        
        const payload = jwt.verify(tokenFromUser,secretWord);
        return payload;
    } catch (error) {
        return null;
    }
}


module.exports = {generateAuthToken,verifyToken};