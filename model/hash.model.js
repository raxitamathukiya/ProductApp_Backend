const mongoose=require("mongoose")
const hashSchema=mongoose.Schema({
    id:{type:String,require:true},
    password:{type:String,require:true},
})
const hashModel=mongoose.model("hashpassword",hashSchema)
module.exports={
    hashModel
}