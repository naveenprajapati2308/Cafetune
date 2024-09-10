const User = require("../models/user.js");
const Singer = require("../models/singer.js");
const Event = require("../models/event.js");
const ExpressError = require("../utils/expressError.js");

module.exports.newRegistration = async(req, res, next) => {
    try {
        let singerId = res.locals.currUser._id;
        console.log(res.locals.currUser);
        if(res.locals.currUser.userType=="normalUser"){
            let user = await User.findOne({_id: singerId});
            user.userType = "singer";
            await user.save();
        }
        res.render("singers/new.ejs", { singerId });
    } catch (e) {
        req.flash("error", "error occured while creating you an singer!");
        console.log(e);
        res.redirect("/caves");
    }
};

module.exports.showEditPage = async(req,res)=>{
    let singer = await Singer.findOne({userId:res.locals.currUser._id});
    // console.log(singer);
    res.render("singers/edit.ejs",{singer});
  };

module.exports.newSinger = async(req,res)=>{
    let {id} = req.params;
    if (!req.body.singer) {
      throw new ExpressError(400, "send valid data for singer profile");
    }
    let singer = new Singer(req.body.singer);
    singer.userId = id;
    if(typeof req.file !== 'undefined'){
      let url = req.file.path ;
      let filename = req.file.filename;
      singer.photo = {url,filename};
    }
    console.log("mohalla me naya singer aaya bajao tali",singer,id);
    await singer.save();
    res.redirect(`/singers/${id}`);
};

module.exports.showSinger = async(req,res)=>{
    let {id} = req.params;
    let singer = await Singer.findOne({userId:id});
    if(singer.events) singer.events = singer.events.reverse();
    console.log("to ye hai singer saab jinki profile dikhani hai",singer);
    singer = await singer.populate("userId");
    singer = await singer.populate({path:"reviews",populate:"author"});
    singer = await singer.populate({path:"events",populate:"cafe"});
    singer = await singer.populate({path:"events.reviews",populate:"author"});
    console.log(singer);
    console.log("currUser",res.locals.currUser);
    res.render("singers/profile.ejs",{singer});
};

module.exports.takeStage = async(req,res)=>{
    let {id,eventId} = req.params;
    console.log("taking stage: singerId",id," eventId",eventId);
    let singer = await Singer.findOne({userId:id});
    let event = await Event.findOne({_id:eventId});
    event.hasSinger = true;
    event.singer = singer;
    singer.events.push(event);
    await event.save();
    await singer.save();
    // res.send("need to create a page where all the events will be shown where the user has taken the stages");
    res.redirect(`/singers/${id}`);
  }

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    if (!req.body.singer) {
      throw new ExpressError(400, "send valid data for singer")
    }
    let singer = await Singer.findByIdAndUpdate(id,{... req.body.singer});
    if(typeof req.file !== 'undefined'){
      let url = req.file.path ;
      let filename = req.file.filename;
      singer.photo = {url,filename};
    }
    await singer.save();
    req.flash("success","profile updated successfully");
    res.redirect(`/singers/${singer.userId}`);
  }

module.exports.allStage = async(req,res)=>{
    let {id} = req.params;
    let all = await Event.find({hasSinger:false});
    if(all.length >0){
      let allEvents = [];
      for (let event of all){
          allEvents.push(await event.populate("cafe"));
      }
      res.render("events/index.ejs",{allEvents});
    }else{
      res.render("singers/emptyEvents.ejs");
    }
  };