const express=require("express")
const passwordRouter=express.Router()
require('dotenv').config()
const  {passwordModel}=require('../model/password.model')
const {connection}=require("../db")
const crypto=require("crypto")
function encryptPassword(password) {
    const cipher = crypto.createCipher('aes-256-cbc', 'raxita');
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    return encryptedPassword;
  }

  function decryptPassword(encryptedPassword) {
    const decipher = crypto.createDecipher('aes-256-cbc', 'raxita');
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');
    return decryptedPassword;
  }
passwordRouter.post("/encryptmypwd",async(req,res)=>{
    try {
        const {id,password}=req.body
        let encpassword=encryptPassword(password)
        let data = new passwordModel({id,password:encpassword})
        await data.save()
        res.status(200).send("Password stored successfully in encrypted form")

        
    } catch (error) {
        console.log(error)
    }
})

passwordRouter.get("/getmypwd/:id",async(req,res)=>{
    try {
        const {id}=req.params
       
       let data=await passwordModel.findOne({id:id})
       let dpassword=decryptPassword(data.password)

       res.status(200).send(`${dpassword}`)

        
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    passwordRouter
}
