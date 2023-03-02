const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const ProductSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',
    },
    name :{
        type : String,
        required : true,
        trim : true
    },
    category: {
        type: String,
        required : true,
        trim: true,
      },
      quantity: {
        type: String,
        required : true,
        trim: true,
      },
      price: {
        type: String,
        required : true,
        trim: true,
      },
      description: {
        type: String,
        required : true,
        trim: true,
      },
      image: {
        type: Object,
        default: {},
      },    
},{ timestamps: true });

//export schema

module.exports = mongoose.model('Product', ProductSchema);
