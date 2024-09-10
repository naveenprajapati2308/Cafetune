const Cafe = require("../models/cafe.js");
const User = require("../models/user.js");
const Event = require("../models/event.js");


module.exports.makeOwner = async(req, res, next) => {
    try {
        let ownerId = res.locals.currUser._id;
        
        if(res.locals.currUser.userType=="normalUser"){
            let user = await User.findOne({_id: ownerId});
            user.userType = "cafeOwner";
            await user.save();
        }
        res.render("caves/newCafe.ejs", { ownerId });
    } catch (e) {
        req.flash("error", "error occured while creating you an owner!");
        res.render("/caves");
    }
}

module.exports.editCafe = async(req,res)=>{
    let cafeOwnerId = res.locals.currUser;
    let cafe = await Cafe.findOne({owner:cafeOwnerId});
    res.render("owners/edit.ejs",{cafe});
}

module.exports.edit = async(req,res)=>{
    console.log(req.body);
    let id = res.locals.currUser._id;
    let cafe = await Cafe.findOne({owner:id});
    if(!cafe){
        return res.send("cafe is undefined in edit route (there may not exist the user as cafe owner or somethis else)")
    }
    let updatedCafe = await Cafe.findByIdAndUpdate(cafe._id,{... req.body.cafe});
    if(!updatedCafe){
        return res.send("updatedCafe is undefined in edit route (there may not exist the user as cafe owner or somethis else)")
    }
    if(typeof req.file !== 'undefined'){
        let url = req.file.path ;
        let filename = req.file.filename;
        updatedCafe.image = {url,filename};
    }
    await updatedCafe.save();
    req.flash("success","cafe information updated successfully");
    res.redirect(`/owners/${updatedCafe.owner}`);
}


module.exports.createOwner = async (req, res) => {
    const newCafe = new Cafe(req.body.cafe);
    newCafe.owner = req.params.cafeOwnerId;
    if(typeof req.file !== 'undefined'){
        let url = req.file.path ;
        let filename = req.file.filename;
        newCafe.image = {url,filename};
    }
    await newCafe.save();
    console.log("newCafe info" + newCafe);
    const user = await User.find({ _id: req.params.cafeOwnerId });
    if (!user) {
        req.flash("error", "You should register first!");
        return res.redirect("/signup");
    }
    res.redirect(`/owners/${newCafe.owner}`);
}

module.exports.showOwner =  async (req, res) => {
    let { cafeOwnerId } = req.params;
    const newCafeInfo = await Cafe.findOne({ owner: cafeOwnerId });
    if(!newCafeInfo){
        req.flash("error","not registered as cafe onwer")
        return res.redirect("/caves")
    }
    let cafeInfo = await newCafeInfo.populate("owner");
    cafeInfo = await cafeInfo.populate({ path: "reviews", populate: { path: "author" } });
    cafeInfo = await cafeInfo.populate({path : "events", populate:{path: "reviews"}});
    
    console.log("cafeInfo in owner.js /:cafeOwnerId route",cafeInfo);
    res.render("owners/index.ejs", { cafeInfo });
}

module.exports.newEvent = (req,res)=>{
    let {cafeOwnerId} = req.params;
    res.render("events/new.ejs",{cafeOwnerId});
}

module.exports.createEvent = async(req,res)=>{
    let {cafeOwnerId} = req.params;
    let event = new Event(req.body.event);
    console.log(event);
    let user = await User.findOne({_id:cafeOwnerId});
    event.owner = user;
    let cafe = await Cafe.findOne({owner:cafeOwnerId});
    event.cafe = cafe;
    if(req.body.flag=="yes"){
        event.hasSinger = false;
    }else {
        event.hasSinger = true;
    }
    if(typeof req.file !== 'undefined'){
        let url = req.file.path ;
        let filename = req.file.filename;
        event.image = {url,filename};
    }
    await event.save();
    cafe.events.push(event);
    await cafe.save();
    console.log("the event",event);
    console.log("the cafe",cafe);
    console.log("the user",user);


    // res.send("sent")
    req.flash("success","new event is created successfully");
    res.redirect(`/owners/${cafeOwnerId}`);
}