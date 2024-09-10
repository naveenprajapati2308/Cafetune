const Review = require("./models/review.js");
const {reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    console.log("inside isLoggedIn middleware: user is logged in ",req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    else{
      req.session.redirectUrl = req.originalUrl;
      req.flash("error","you must be login before redirection!");
      return res.redirect("/login");
    }
}

// since passport(middleware) reinitialize the value of req object, so we can't use the value of req.session.redirectUrl after signup or login process. So we have to create a new middleware for the same thing and save the req.session.redirectUrl value inside res.locals

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    next();
}

module.exports.validateListing = (req,res,next) =>{
    next();
  };

// validate review function as middleware
module.exports.validateReview = (req,res,next) =>{
    let result = reviewSchema.validate(req.body);
    if(result.error){
      let errMsg = result.error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  };

  module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review!");
        return res.redirect(`/caves/${id}`);
    }
    next();
}

module.exports.isCafeOwner = async (req,res,next)=>{
  let {cafeOwnerId} = req.params;
  let user = res.locals.currUser;
  if( user.userType === "cafeOwner"){
    if(cafeOwnerId === user._id.toString()){
        console.log("is cafe owner varified")
        return next();
    }
    req.flash("error","You are not the owner of this Cafe! you should register as cafeOwner");
    return res.redirect("/signup");
  }
  
  return res.redirect(`/owners/${user._id}`);
}