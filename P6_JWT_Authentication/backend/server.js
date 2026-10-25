require("dotenv").config();
const express=require("express"), mongoose=require("mongoose"), cors=require("cors");
const bcrypt=require("bcryptjs"), jwt=require("jsonwebtoken"), User=require("./models/User");
const app=express(); app.use(cors()); app.use(express.json());
const secret=process.env.JWT_SECRET||"practice_secret";
mongoose.connect(process.env.MONGODB_URL||"mongodb://127.0.0.1:27017/userDB").then(()=>console.log("MongoDB connected")).catch(e=>console.log(e.message));
app.post("/register",async(req,res)=>{try{const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({message:"All fields are required"});if(await User.findOne({email}))return res.status(400).json({message:"User already exists"});await User.create({name,email,password:await bcrypt.hash(password,10)});res.status(201).json({message:"User registered successfully"});}catch(e){res.status(500).json({message:e.message})}});
app.post("/login",async(req,res)=>{try{const {email,password}=req.body;const user=await User.findOne({email});if(!user||!await bcrypt.compare(password||"",user.password))return res.status(401).json({message:"Invalid email or password"});const token=jwt.sign({userId:user._id,email:user.email},secret,{expiresIn:"1h"});res.json({message:"Login successful",token});}catch(e){res.status(500).json({message:e.message})}});
function verifyToken(req,res,next){const header=req.headers.authorization;if(!header||!header.startsWith("Bearer "))return res.status(401).json({message:"Token required"});try{req.user=jwt.verify(header.slice(7),secret);next()}catch{return res.status(401).json({message:"Invalid or expired token"})}}
app.get("/profile",verifyToken,(req,res)=>res.json({message:"Protected route accessed successfully",user:req.user}));
app.get("/",(req,res)=>res.send("JWT Authentication API is running"));
app.listen(5000,()=>console.log("Server running on port 5000"));
