
const errorHandler = (err,req,res,next)=>{

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    //here err come from this err--> ("err",req,res,next)
    res.json({
        message : err.message,
        //for show err where come from in console 
        stack : process.env.NODE_ENV === 'development' ? err.stack : null
    })
};

module.exports = errorHandler;