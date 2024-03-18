const mongoose=require('mongoose')
const userscheme=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    secondname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true

    },
    password:{
        type:String,
        required:true
    }
    
})

let User=mongoose.model('User',userscheme,'user')
module.exports=User