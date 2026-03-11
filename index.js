import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors({origin:"https://funny-faun-7fe9f8.netlify.app"}))

app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)

app.get("/", (req,res)=>{
    res.send("Password Reset API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("Server running on port",PORT)
})