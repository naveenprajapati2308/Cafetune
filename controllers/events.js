const Event = require("../models/event");
const Review = require("../models/review.js");

module.exports.index = async(req,res)=>{
    let all = await Event.find({hasSinger:true}); 
    let allEvents = [];
    for (let event of all){
        allEvents.push(await event.populate("cafe"));
    }
    console.log(allEvents);
    res.render("events/index.ejs",{allEvents});
}

module.exports.eventFilter = async(req,res)=>{
    let {locationText,eventText} = req.body;
    let all = await Event.find({hasSinger:true});
    all = all.filter(event =>{
        return new RegExp(eventText,'i').test(event.title);
    });
    let allEvents = [];
    for (let event of all){
        allEvents.push(await event.populate("cafe"));
    }
    allEvents = allEvents.filter(event =>{
        return new RegExp(locationText,'i').test(event.cafe.location);
    });
    console.log(allEvents);
    res.render("events/index.ejs",{allEvents});
}

module.exports.showEvent = async(req,res)=>{
    let {id} = req.params;
    let event = await Event.findOne({_id:id});
    event = await event.populate("owner");
    event = await event.populate("cafe");
    event = await event.populate({path :"reviews",populate : {path:"author"}});
    console.log("event with id",id,"is here",event);
    res.render("events/showEvent.ejs",{event});
}

module.exports.createReview = async(req,res)=>{
    let {id}= req.params;
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    await newReview.save();
    let event = await Event.findOne({_id:id});
    event.reviews.push(newReview);
    await event.save();
    req.flash("success","new review created")
    res.redirect(`/events/${id}`);
};

