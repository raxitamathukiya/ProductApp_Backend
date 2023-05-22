const mongoose=require("mongoose")
const passwordSchema=mongoose.Schema({
    id:{type:String,require:true},
    password:{type:String,require:true},
})
const passwordModel=mongoose.model("password",passwordSchema)
module.exports={
    passwordModel
}