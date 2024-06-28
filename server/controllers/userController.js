const User = require("../models/user")
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcryptjs")
require("dotenv").config()
const jwtKey = process.env.JWT_KEY ;

exports.addUserController = async(req,res)=>{
    try{
        const {name,email, password, c_password} = req.body;
        const alredyregistered = await User.find({email});
        console.log(alredyregistered);
        if(alredyregistered.length!=0){
            res.status(501).send({
                success:false,
                data:alredyregistered,
                message:"email already registered"
            })
        }
        else{
            const user = new User({name ,email,password,c_password }); 
            const saveduser = await user.save();
            res.status(200).send({
                success:true,
                data:saveduser,
                message:"user data load in db successfully"
            })
        }
       
    }catch(err){
        res.status(500).send({
            success:false,
            data:"error",
            message:err.message ,
        })
    }
}


exports.isLoginController =async(req,res)=>{
    try{
        const{email,password} = req.body ;
        // console.log(email,password);
        const user = await User.findOne({email});
        console.log(user);
    
        const valid =await bcrypt.compare(password,user.password) ;
        console.log("valid :",valid) ;
        if(!valid){
            res.status(500).send({
                success:false,
                message:"enter valid data"
            })
        }
        if(user ){
            //generating jwt token
            jwt.sign({user},jwtKey,{expiresIn:"3d"},(err,token)=>{
                if(err){
                    res.status(401).send({
                        success:false,
                        message:err.message
                    });
                }else{
                    console.log(user,token);
                    res.status(200).send({
                        success:true,
                        data:{user,token},
                        message:"it is registered user"
                    })
                }
            })
            
        }else{
            res.status(500).send({
                success:false,
                message:"user not register"
            })
        }
    }catch(err){
        res.status(404).send({
            success:false,
            message:err.message
        })
    }
   
}
