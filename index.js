const express=require('express')
const app=express()
const {passwordRouter}=require("./router/password.route")
const {hashRouter}=require("./router/hash.route")
const {userRoute}=require("./router/user.router")
const {productRoute}=require("./router/product.route")
const {connection}=require("./db")
require('dotenv').config()
app.use(express.json())
app.use("/",(req,res)=>{
    res.send("Home Route")
})
app.use("/password",passwordRouter)
app.use("/hash",hashRouter)
app.use("/user",userRoute)
app.use("product/",productRoute)
app.listen(8080,async()=>{
    try {
       await connection
       console.log("connect to the db")

    } catch (error) {
        console.log(error)
    }
    console.log("server is running.....")
})
