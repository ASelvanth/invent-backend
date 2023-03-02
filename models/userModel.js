const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim:true,        
    },
    email : {
        type : String,
        required : true,
        trim:true,
        unique : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            " pls enter valid email"
        ],
    },
    password: {
        type : String,
        required : true,
        minLength : [6, "password must be up to 6 characters"],
        // maxLength : [25, "password must not be more than 15 characters"],   
    },
    photo :{
        type : String,
        default :"file:///C:/Users/selvanth/Pictures/user-2935527__340.webp"
    }, 
    phone :{
        type : String,
        // default : "+91",

    },
    bio :{
        type : String,
        maxLength :"150",
        default : "bio",
    },
         
},{ timestamps: true });

//Encrypt password before saving it to the DB
    userSchema.pre("save",async function (next){

        if(!this.isModified("password")){
            return next();
        }
    
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
    });

//export schema

module.exports = mongoose.model('User', userSchema);

