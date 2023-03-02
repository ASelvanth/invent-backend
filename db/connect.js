const mongoose = require('mongoose');

db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connection established');
    }catch(error){
        console.log("DB Error :", error);
    }    
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

module.exports = db;


  
