const asyncHandler = require('express-async-handler');
const dotenv = require("dotenv").config();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// const protect = asyncHandler (async (req, res , next) => {
    // try{
    //     const token = req.headers.authorization.split(' ')[1];
    //     const isCustomAuth = token.length < 200 ;

    //     let decodeData;


    //     if(token && isCustomAuth){
    //         decodeData = jwt.verify(token,process,env.JWT_SECRET);
    //         req.userId = decodeData?.sub;
            
    //     }
    //     else{
    //         decodeData = jwt.verify(token,process,env.JWT_SECRET);
    //         req.userId = decodeData?.sub;

    //     }

    //     next();

const protect = async(req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
      }
  
      // Verify Token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      // Get user id from token
      const user = await User.findById(verified.id).select("-password");
  
      if (!user) {
        res.status(401).send({message : "User not found"});
        
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({message : "Not authorized, please login"});
      
    }
};

module.exports = protect;