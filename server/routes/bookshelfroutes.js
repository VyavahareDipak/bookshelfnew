const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
require('dotenv').config()
const jwtKey = process.env.JWT_KEY ;
const {sendmailController} = require("../controllers/sendMailController")
const{addUserController, isLoginController} = require('../controllers/userController')
const {addPostController,removePostController,getPostController, searchPostController} = require('../controllers/postController')



router.post('/add/user',addUserController);
router.post('/islogin',isLoginController);
router.post('/add/post',verifyToken,addPostController);
router.get('/getPost',getPostController);
router.get('/searchPost',verifyToken,searchPostController);
router.post('/remove/post',removePostController);
router.post('/sendmail',sendmailController)
//midleware to verify token
//take 3 values
//
function verifyToken(req,resp,next){
    console.log("hello")
    const token = req.headers.authorization;
     console.log(token) ;
    if(token){
        jwt.verify(token,jwtKey,(err,success)=>{
            if(err){
                resp.status(500).send({
                    success:false,
                    message:err.message,
                })
            }
            else{
                next();
            }
        })
    }else{
        resp.status(501).send({
            success:false,
            message:"token not found"
        })
    }
}
module.exports = router ;