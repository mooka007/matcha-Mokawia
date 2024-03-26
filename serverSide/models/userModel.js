const mongoose = require('mongoose');
const crypto = require('crypto');
import { Sequelize } from "sequelize";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        maxlength: 50
    },
    lastName : {
        type : String,
        required: true,
        maxlength: 50
    },
    email :{
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        // to ensure consistency and prevent potential issues related to undefined values.
        default: "" ,
        type: String,
        required:true
    },
    about: {
        type: String,
        maxlength: 500 // You can adjust the maximum length as needed
    },
    image: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ["no picture for this product"],
    },
    verification: {
        default: false,
        type: Boolean,
        required: true
    },
})

userSchema.methods = {
    authenticated: function(pwd) {
        return cryptPassword(pwd) === this.password
    },
    cryptNewPassword: function (password) {
        return cryptPassword(password)
    }
}

const cryptPassword = (password) => {
    if (!password) {
        return ''
    }
    else {
        try {
            return crypto.createHmac('sha1', process.env.PASSWORD_SALT)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    }
}


module.exports = mongoose.model('users', userSchema)