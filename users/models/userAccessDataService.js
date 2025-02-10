const User = require("../models/mongoDB/User");
const { comparePassword, generatePassword } = require("../helpers/dcrypt");
const { generateAuthToken } = require("../../auth/providers/jwt");
const chalk = require('chalk');


const RegisterUser = async (newUser) => {

    try {
        const emailFromDB = await User.findOne({ email: newUser.email });

        if (emailFromDB) {
            throw new Error("User allready Registered - Please Login");
        };

        newUser.password = generatePassword(newUser.password);

        let user = await new User(newUser);
        user = await user.save();

        user = { email: user.email, name: user.name, _id: user._id };

        return user;

    } catch (error) {
        console.error("Mongoose: " + error.message);

    }
}



const userLogin = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email });

        if (!userFromDB) {
            throw new Error('User Not Exit! - Please Register');
        }

        if (!comparePassword(password, userFromDB.password)) {
            const error = Error("Password Missmatch");
            error.status = 401;
            createError("Authentication", error);

        }

        
        console.log(chalk.bgGreenBright("You Are Loged In!"));
        
        const token = generateAuthToken(userFromDB);

        return token;

    } catch (error) {
        console.error("Mongoose: " + error.message);
        
        
    }
}



const getAllUsers = async (userId) => {
    try {
        const userinfo = await User.findById(userId)

        if(!userinfo.isAdmin){
            throw new Error("Only Admin is Authorized")
        }

        let users = await User.find({});
        return users;

    } catch (error) {
        console.error("Mongoose: " + error.message);
    }

}

const getUser = async (userId) => {

    try {

        let user = await User.findById(userId);

        if (!user) {
            throw new Error("User Not Found in DataBase!")
        }

        if (!user.isAdmin || user._id != userId) {
            throw new Error("Only admin or Registed User is Authorized")
        }


        return user;

    } catch (error) {
        console.error("Mongoose: " + error.message);
    }
}


const updateUser = async (userId, newUser) => {

    try {
        
        const user = await User.findById(userId);

        if (user._id != userId || user.isAdmin) {
            throw new Error("Only Registed User Can Modify User Details!")

        }

        let updatedUser = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return updatedUser;


    } catch (error) {
        console.error("Mongoose: " + error.message);
    }

}

// ! NEED TO CHACK THE LOGIC
const changeBusinessStatus = async (userId) => {
    try {
        let user = await User.findById(userId);

        if (!user) {
            throw new Error("User Not Found in DataBase!");

        }

        user.isBusiness = !user.isBusiness;

        await user.save();
        return user;



    } catch (error) {
        console.error("Mongoose: " + error.message);
    }
}


const deleteUser = async (userId) => {

    try {
        let deletedUser = await User.findByIdAndDelete(userId);

        return deletedUser;


    } catch (error) {
        console.error("Mongoose: " + error.message);
    }

}


module.exports = { RegisterUser, getAllUsers, userLogin, getUser, updateUser, changeBusinessStatus, deleteUser }
