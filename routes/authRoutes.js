import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import sendMail from "../utils/sendMail.js"

const router = express.Router()


// Forgot Password

router.post("/forgot-password", async (req,res)=>{

    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    const randomString = Math.random().toString(36).substring(2,15)

    user.resetString = randomString
    user.resetExpire = Date.now() + 3600000

    await user.save()

    const link = `${process.env.FRONTEND_URL}/reset-password/${randomString}`

    await sendMail(email, link)

    res.json({
  message: "Reset link generated",
  resetLink
});
})




// Verify Token

router.get("/reset-password/:token", async (req,res)=>{

    const user = await User.findOne({
        resetString:req.params.token,
        resetExpire:{$gt:Date.now()}
    })

    if(!user){
        return res.status(400).json({message:"Invalid or expired link"})
    }

    res.json({message:"Token valid"})
})




// Reset Password

router.post("/reset-password/:token", async (req,res)=>{

    const {password} = req.body

    const user = await User.findOne({
        resetString:req.params.token,
        resetExpire:{$gt:Date.now()}
    })

    if(!user){
        return res.status(400).json({message:"Invalid or expired link"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    user.password = hashedPassword
    user.resetString = null
    user.resetExpire = null

    await user.save()

    res.json({message:"Password updated successfully"})
})

export default router