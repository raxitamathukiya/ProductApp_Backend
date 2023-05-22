const express=require("express")
const hashRouter=express.Router()
require('dotenv').config()
const  {hashModel}=require('../model/hash.model')
const {connection}=require("../db")
const bcrypt=require('bcrypt')

hashRouter.post("/hashmypwd",async(req,res)=>{
    try {
       const {id,password}=req.body 
       bcrypt.hash(password, 5, async(err, hash)=> {
        if(hash){
            const data= new hashModel({id:id,password:hash})
            await data.save()
            res.status(200).send('Hash of the Password stored successfully.')
        }
       })
    } catch (error) {
        console.log(error)
    }
})
hashRouter.post("/verifymypwd",async(req,res)=>{
    try {
        const {id,password}=req.body
        let data=await hashModel.findOne({id:id})
       
       bcrypt.compare(password,data.password,(err,result)=> {
        if(result){
            res.status(200).send(true)
        }else{
            res.status(200).send(false)  
        }
       })
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    hashRouter
}