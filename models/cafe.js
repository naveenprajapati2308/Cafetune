const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:  {
    url: String,
    filename:String
  },
  phone: Number,
  location: String,
  country: String,
  owner:{
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  reviews:[{
    type : Schema.Types.ObjectId,
    ref : "Review" 
  }],
  events:[{
    type : Schema.Types.ObjectId,
    ref : "Event" 
  }],
//   geometry :{
//       type: {
//         type: String, // Don't do `{ location: { type: String } }`
//         enum: ['Point'], // 'location.type' must be 'Point'
//         required: true
//       },
//       coordinates: {
//         type: [Number],
//         required: true
//       }
//   }
});
 

const Cafe = mongoose.model("Cafe", cafeSchema);
module.exports = Cafe;
