const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review.js');
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename:String
  },
  price: Number,
  date: String,
  time:String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    },
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  cafe:{
    type : Schema.Types.ObjectId,
    ref : "Cafe"
  },
  hasSinger: Boolean, // to check whether the cafe owner already selected some singer
  singer: {
    type: Schema.Types.ObjectId,
    ref: "Singer"
  }, // to check whether the singer has ocupied the notification
});

eventSchema.post("findOneAndDelete", async (event)=>{
  if(event){
    await Review.deleteMany({ _id: {$in: event.reviews}});
  } 
}); 

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
