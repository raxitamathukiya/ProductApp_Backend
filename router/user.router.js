const express=require("express")
const userRoute=express.Router()
const {userModel}=require("../model/user.model")
const {connection}=require("../db")
const {auth}=require("../middleware/auth")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const roles=require('../middleware/roles')
const session = require('express-session');
userRoute.use(session({
    secret: 'raxita', 
    resave: false, 
    saveUninitialized: true, 
  }));
userRoute.post("/signup",async(req,res)=>{
    try {
        const {email,password,name,role}=req.body
        let bodydata= await userModel.findOne({email:req.body.email})
        if(bodydata){
            return res.send({message:"user already  exits"})
        }
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                let data=new userModel({name,email,role,password:hash})
                data.save()
                res.status(200).send({message:"registration done!!!!"})
            }
        })
        
    } catch (error) {
        console.log(error)
    }
})
userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        let user= await userModel.findOne({email})
        if(!user){
            return res.send({message:"User not Exits"})
        }
        const hashpasswordmatch= await bcrypt.compare(password,user.password)
        if(!hashpasswordmatch){
            res.status(401).send({message:"Invalid Email and Password"})
        }
        const token= jwt.sign({email}, 'raxita',{expiresIn:"1min"});
        const refreshtoken= jwt.sign({email}, 'raxita',{expiresIn:"5min"});
        req.session.user = user;
        res.status(200).send({meassage:"login successfully","token":token,"refreshtoken":refreshtoken})

    } catch (error) {
        console.log(error)
    }
})
userRoute.post("/logout",async(req,res)=>{
    try {
          
    } catch (error) {
        console.log(error)
    }
})


  module.exports={
    userRoute
  }