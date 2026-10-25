import { useState } from "react";
export default function App(){
 const [form,setForm]=useState({name:"",email:"",password:"",age:""}),[message,setMessage]=useState("");
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();if(!form.name.trim()||!form.email||!form.password||!form.age){setMessage("All fields are required");return}if(!/^\S+@\S+\.\S+$/.test(form.email)){setMessage("Enter a valid email");return}if(form.password.length<6){setMessage("Password must contain at least 6 characters");return}if(Number(form.age)<18){setMessage("Age must be 18 or above");return}
 try{const r=await fetch("http://localhost:5000/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const data=await r.json();setMessage(data.message)}catch{setMessage("Unable to connect to server")}};
 return <div className="card"><h1>User Registration with Validation</h1><form onSubmit={submit}>{["name","email","password","age"].map(k=><div key={k}><input name={k} placeholder={"Enter "+k} type={k==="password"?"password":k==="email"?"email":k==="age"?"number":"text"} value={form[k]} onChange={change} /></div>)}<button type="submit">Register</button></form><p>{message}</p></div>
}
