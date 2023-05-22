const express=require("express")
const productRoute=express.Router()
const { productModel}=require("../model/product.model")
const {connection}=require("../db")
const {auth}=require("../middleware/auth")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const roles=require('../middleware/roles')
const session = require('express-session');
productRoute.use(session({
    secret: 'raxita', 
    resave: false, 
    saveUninitialized: true, 
  }));

  productRoute.get("/products",auth,async(req,res)=>{
    try {
        const data= await productModel.find()
        res.status(200).json(data) 
    } catch (error) {
        console.log(error)
    }
})
productRoute.post("/addproducts",roles("seller"),auth,async(req,res)=>{
    try {
        const data=req.body
        const add=new productModel(data)
        await add.save()
        res.status(200).send("product added")
    } catch (error) {
        console.log(error)
    }
})
productRoute.delete("/deleteproducts/:id",roles("seller"),auth,async(req,res)=>{
    try {
        const {id}=req.params
        const data=await productModel.findByIdAndDelete({id:id})
        res.status(200).send("product deleted")
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    productRoute
}