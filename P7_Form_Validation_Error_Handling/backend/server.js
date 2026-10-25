const express=require("express"), cors=require("cors");
const app=express();app.use(cors());app.use(express.json());
app.post("/register",(req,res)=>{try{
 const {name,email,password,age}=req.body;
 if(!name||!email||!password||!age)return res.status(400).json({message:"All fields are required"});
 if(!/^\S+@\S+\.\S+$/.test(email))return res.status(400).json({message:"Invalid email address"});
 if(password.length<6)return res.status(400).json({message:"Password must contain at least 6 characters"});
 if(Number(age)<18)return res.status(400).json({message:"Age must be 18 or above"});
 res.status(201).json({message:"Registration successful"});
}catch(e){res.status(500).json({message:"Internal server error"})}});
app.get("/",(req,res)=>res.send("Validation API is running"));
app.listen(5000,()=>console.log("Server running on port 5000"));
