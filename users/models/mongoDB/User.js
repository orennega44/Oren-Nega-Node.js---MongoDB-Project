const mongoose = require("mongoose");
const { Name } = require("../../../helpers/mongodb/Name");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooshValidation");
const { Image } = require("../../../helpers/mongodb/Image");
const { Address } = require("../../../helpers/mongodb/Address");



const userSchema = new mongoose.Schema({
    name: Name,
    phone:PHONE,
    email:EMAIL,
    password:{
        type:String,
        require:true,
        trim:true
    },
    image:Image,
    address:Address,
    isBusiness:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    createdAt:{type:Date,
        default: Date.now()
    }
})

const User = mongoose.model("user",userSchema);

module.exports = User;