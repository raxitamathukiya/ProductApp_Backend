const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    title:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
   
})
const  productModel=mongoose.model("product", productSchema)
module.exports={
    productModel
}