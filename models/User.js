import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    resetString:String,

    resetExpire:Date

})

export default mongoose.model("User", userSchema)