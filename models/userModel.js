const crypto = require('crypto');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('valida')

const userScheme = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Username field is required"]
    }, 
    email:{
        type: String,
        required:[true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, "Please provide a valid email"]
        
    },
    slug:{
        type: String,
        required: [true, "Unique slug is required"]
    },
    role:{
        type: String,
        required:[true, "User role is required"],
        enum:['user', 'name'],
        default: 'user'

    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type: String,
        required:[true, "Please confirm your password"],
        validate:{
            //Only works on create and save
            validator: function(el){
                return el===this.password
            },
            message:"Passwords are not the same!"
        }

    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passowrdResetExpires: Date,

    active:{
        type: Boolean,
        default: true,
        select: false
    }

})