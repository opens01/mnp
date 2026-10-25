import { useState } from "react";
import axios from "axios";
const API="http://localhost:5000";
export default function App(){
 const [form,setForm]=useState({name:"",email:"",password:""}),[token,setToken]=useState(""),[message,setMessage]=useState("");
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const register=async()=>{try{const r=await axios.post(API+"/register",form);setMessage(r.data.message)}catch(e){setMessage(e.response?.data?.message||"Register failed")}};
 const login=async()=>{try{const r=await axios.post(API+"/login",form);setToken(r.data.token);setMessage(r.data.message)}catch(e){setMessage(e.response?.data?.message||"Login failed")}};
 const profile=async()=>{try{const r=await axios.get(API+"/profile",{headers:{Authorization:"Bearer "+token}});setMessage(JSON.stringify(r.data))}catch(e){setMessage(e.response?.data?.message||"Request failed")}};
 return <div className="card"><h1>JWT Authentication</h1>{["name","email","password"].map(k=><input key={k} name={k} placeholder={k} type={k==="password"?"password":k==="email"?"email":"text"} value={form[k]} onChange={change}/>)}<p><button onClick={register}>Register</button><button onClick={login}>Login / Get Token</button><button onClick={profile} disabled={!token}>Open Protected Profile</button></p><p>{message}</p>{token&&<p>JWT token received and stored in this page state.</p>}</div>
}
