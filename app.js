if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const userRouter = require("./routes/user.js");
const ownerRouter = require("./routes/owner.js");
const cafeRouter = require("./routes/cafe.js");
const eventRouter = require("./routes/event.js");
const singerRouter = require("./routes/singer.js");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/cafetunes";
dbUrl = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto :{
    secret: process.env.SECRET
  },
  touchAfter: 24*3600,
})

store.on("error", ()=>{
  console.log("ERROR in MONGO SESSION STORE",err)
});

// options set for session created 
const sessionOptions = {
  store:store,
  secret : process.env.SECRET,
  resave : false,  // don't resave the same session when there is no change in session(store)
  saveUninitialized: true,// if session is uninitialized then save it to the store(session)
  cookie:{ // session ke sath jo cookie attatch hai uski properties
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // ajj ki date se 7 din bad ye cookie ki info expire ho jayegi
    maxAge : 7 * 24 * 60 * 60 * 1000, // cookie ki max age 7 din
    httpOnly: true // to secure from crossScripting attacks
  }
};


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/owners",ownerRouter)
app.use("/singers",singerRouter);
app.use("/caves",cafeRouter);
app.use("/events",eventRouter);
app.use("/",userRouter);

app.get("/privacy",(req,res)=>{
  res.render("privacy.ejs");
})
app.get("/terms",(req,res)=>{
  res.render("terms.ejs");
})
app.all("*",(req,res,next)=>{
next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req,res,next)=>{
  let {statusCode = 500,message="Something Went Wrong!"} = err;
  // res.status(statusCode).send(message);
  res.render("error.ejs",{message});
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
