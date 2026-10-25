require("dotenv").config();
const express=require("express"), mongoose=require("mongoose"), cors=require("cors");
const bcrypt=require("bcryptjs"), jwt=require("jsonwebtoken");
const User=require("./models/User");
const app=express(); app.use(cors()); app.use(express.json());
mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/userDB")
 .then(()=>console.log("MongoDB connected")).catch(e=>console.log("MongoDB error:",e.message));
app.get("/",(req,res)=>res.send("Authentication API is running"));
app.post("/register",async(req,res)=>{try{
 const {name,email,password}=req.body;
 if(!name||!email||!password)return res.status(400).json({message:"All fields are required"});
 if(await User.findOne({email}))return res.status(400).json({message:"User already exists"});
 const user=await User.create({name,email,password:await bcrypt.hash(password,10)});
 res.status(201).json({message:"Registration successful",id:user._id});
}catch(e){res.status(500).json({message:e.message})}});
app.post("/login",async(req,res)=>{try{
 const {email,password}=req.body; const user=await User.findOne({email});
 if(!user||!await bcrypt.compare(password||"",user.password))return res.status(401).json({message:"Invalid email or password"});
 const token=jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET||"practice_secret",{expiresIn:"1h"});
 res.json({message:"Login successful",token});
}catch(e){res.status(500).json({message:e.message})}});
app.listen(5000,()=>console.log("Server running on port 5000"));
