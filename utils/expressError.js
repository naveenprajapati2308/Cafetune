class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;
function a(){
    console.log("hello");
}
module.experts = a;