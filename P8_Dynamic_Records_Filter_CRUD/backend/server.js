require("dotenv").config();
const express=require("express"),mongoose=require("mongoose"),cors=require("cors");
const app=express();app.use(cors());app.use(express.json());
mongoose.connect(process.env.MONGODB_URL||"mongodb://127.0.0.1:27017/CollegeDB").then(()=>console.log("MongoDB connected")).catch(e=>console.log("MongoDB error:",e.message));
app.use("/api/students",require("./routes/studentRoutes"));
app.get("/",(req,res)=>res.send("Student Management API is running"));
app.listen(5000,()=>console.log("Server running on port 5000"));
