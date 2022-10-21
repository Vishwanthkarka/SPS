const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
    maxlength: [120, "Product name should be not more than 120 charactres"],
  },
  subject: {
    type: String,
    required: [true, "Please provide subject"],
    
  },
  description: {
    type: String,
    required: [true, "Please provide  description"],
    trim: true,
  },
  fromDate:{
    type: Date,
    required: [true, "Please provide  description"],
  },
  toDate:{
    type:Date,
    required: [true, "Please provide  description"],
  },
  duration:{
  type:Number,

  },
  category: {
    type: String,
    required: [
      true,
      "Please provide product category (HEALTH, PROGRAMS, HACKATHON , EVENTS)",
    ],
    enum: {
      values: ["HEALTH", "PROGRAMS", "HACKATHON" , "EVENTS" ],
      message:
        "Please provide product category only from: SHORT_SLEEVES, LONG_SLEEVES, SWEAT_SHIRTS and HOODIES",
    },
    trim: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
       
      },
      comment: {
        type: String,
  
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
 
  },

  is_PermisssionGranted:{
    type:Number,
    default:0
  }
  ,
  photo:[
{
  id:{
    type:String,
  },
  secure_url:{
    type:String,
  }
}
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
