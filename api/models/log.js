const mongoose= require('mongoose')
const User=require('./user')

const logScehme=new mongoose.Schema({
  
    title:{
        type:String
    },
      content:{
        type:String
    },
    image:{
        type: String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:User
    }
})

let Log=mongoose.model('Log',logScehme,'log')
module.exports=Log