import { useState } from "react";
import axios from "axios";
export default function App(){
 const [mode,setMode]=useState("register"),[form,setForm]=useState({name:"",email:"",password:""}),[message,setMessage]=useState("");
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();try{const res=await axios.post("http://localhost:5000/"+mode,form);setMessage(res.data.message+(res.data.token?" — Token received":""));}catch(e){setMessage(e.response?.data?.message||"Request failed")}};
 return <div className="card"><h1>User Registration and Login</h1><button onClick={()=>{setMode("register");setMessage("")}}>Register</button><button onClick={()=>{setMode("login");setMessage("")}}>Login</button><form onSubmit={submit}>{mode==="register"&&<input name="name" placeholder="Name" value={form.name} onChange={change} required/>}<input type="email" name="email" placeholder="Email" value={form.email} onChange={change} required/><input type="password" name="password" placeholder="Password" value={form.password} onChange={change} required/><button type="submit">{mode==="register"?"Register":"Login"}</button></form><p>{message}</p></div>
}
