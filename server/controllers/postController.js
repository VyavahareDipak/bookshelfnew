const Post = require('../models/post');
const User = require('../models/user') ;
// const mongoose = require("mongoose");
// const {  GridFSBucket } = require('mongodb');



exports.addPostController = async (req,res)=>{
    try{
        const {user ,name,price,location,image,description} = req.body ;
        const post = new Post({user ,name,price,location,description,image});
        const savedPost = await post.save();
 
        const updatedUser = await User.findByIdAndUpdate(user,{$push:{posts:savedPost._id}},{new:true});
 
        res.status(200).send({
         succuss:true,
         data:savedPost,//updatedUser, 
         message:"post loaded in db user's post array updated successfully"
        })
    }catch(err){
        res.status(500).send({
            succuss:false,
            data:"error",
            message:err.message,
           })
    }
      
} 


exports.removePostController = async (req,res)=>{
    try{
        const {user ,post} = req.body ;

        await  Post.findByIdAndDelete(post);
        const updatedUser = await User.findByIdAndUpdate(user,{$pull:{posts:post}},{new:true});
 
        res.status(200).send({
         succuss:true,
         data:updatedUser,
         message:"post deleted from db user's post array updated successfully"
        })
    }catch(err){
        res.status(500).send({
            succuss:false,
            data:"error",
            message:err.message
           })
    } 
}
exports.getPostController =async(req,res)=>{
    try{
        const data =await Post.find();
        res.status(200).send(data)
        }
    catch(err){
        res.status(500).send([])
    }
}

exports.searchPostController = async (req,res)=>{
    try{
        const{query}=req.query;
        console.log(query.length);
        console.log(query);
        if(query==""){
            const data = await Post.find();
            res.status(201).send(data );
        }
        else{
            const data =await User.findOne({_id:query}).populate('posts') ;
            console.log(data) ;
            console.log("in my post") ;

            res.status(200).send(data.posts  
            )
        }
    }
    catch(err){
    res.status(500).send({
        succuss:false,
        message:err.message
    })
    }
}