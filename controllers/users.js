const User = require("../models/user");
const Cafe = require("../models/cafe");

module.exports.renderSignupForm = (req,res)=>{
    console.log("req body recieved from home to signup",req.body)
    let {userType} = req.body;
    console.log("userType recieved at user.js route by home",userType);
    console.log("user is redirected to signup page");

    res.render("users/signup.ejs",{userType});
};

module.exports.registerUser = async(req,res)=>{
    try{
        let {username, email, password, type} = req.body;
        let userType = type;
        console.log("userType recieved at user.js route by signup page",userType);

        let newUser = new User({email,userType,username});
        let registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            // for cafeowner
            if(type === "cafeOwner"){
                req.flash("success","Welcome to cafetunes! Register your Cafe!");
                res.redirect(`/owners/new`);
            }
            // singer
            else if(type == 'singer'){
                req.flash("success","Welcome to cafetunes! Register yourself as a snger!");
                res.redirect(`/singers/new`);
            }
            // for normaluser
            else if(type == 'normalUser'){
                req.flash("success","Welcome to cafetunes!");
                res.redirect(`/caves`);
            }
            else{
                req.flash("error","you are here due to some mistake as you are not registered as any type of user");
                res.redirect("/");
            }
            return;
        })
        
        
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req,res)=>{
    let redirectUrl = res.locals.redirectUrl;
    if(!redirectUrl){
        if(!req.user){
            req.flash("error","not registered now")
            return res.redirect("/caves")
        }

        if(req.user.userType === 'cafeOwner'){
            req.flash("success","Welcome back to Cafetunes!");
            let cafe = await Cafe.findOne({owner:req.user._id});
            if(!cafe){
                req.flash("error","You are not registered as cafe owner now")
                return res.redirect("/caves")
            }
            return res.redirect(`/owners/${cafe.owner}`);
        }
        else if(req.user.userType === 'singer'){
            let singerId = req.user._id;
            return res.redirect(`/singers/${singerId}`);
        }
        else if(req.user.userType === 'normalUser'){
            req.flash("success","Welcome back to Cafetunes!");
            return res.redirect(`/caves`);
        }
        else{
            return res.send("login path for singer or normal user is not given in controllers");
        }
    }
    else{
        redirectUrl = redirectUrl || "/caves";
        res.redirect(redirectUrl);
    }
    
};

module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    })
    req.flash("success","you are now logged out!");
    res.redirect("/caves");
};