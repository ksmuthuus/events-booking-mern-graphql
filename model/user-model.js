const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  createdEvents:[{
    type: Schema.Types.ObjectId,
    ref:'Event'
  }]
})

module.exports = mongoose.model('User',userSchema)