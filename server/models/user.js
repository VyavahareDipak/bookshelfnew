const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    c_password:{
        type:String,
        required:true,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
})

// this midle ware run before save
userSchema.pre('save',async function(next){
    const user = this ;
    // if password is not modify
    if(!user.isModified("password")){
         next() ;
    }
    try{
        const salt =await bcrypt.genSalt() ;
        const hash_passward =await bcrypt.hash(user.password,salt) ;
        user.password=hash_passward ;
        user.c_password=hash_passward;
    }catch(err){
        next(err) ;
    }
    
})

module.exports = mongoose.model("User",userSchema);