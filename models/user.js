const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum: ['normalUser','cafeOwner','singer'],
        required: true,
    },
    userId:{
        type : String,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model("User",userSchema);