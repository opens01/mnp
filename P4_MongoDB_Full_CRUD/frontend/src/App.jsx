import { useEffect, useState } from "react";
import axios from "axios";
const API="http://localhost:5000/student";
const blank={name:"",roll:"",course:""};
export default function App(){
 const [form,setForm]=useState(blank),[students,setStudents]=useState([]),[editId,setEditId]=useState(null),[message,setMessage]=useState("");
 const load=async()=>{try{setStudents((await axios.get(API)).data)}catch{setMessage("Check backend and MongoDB.")}};
 useEffect(()=>{load()},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const save=async()=>{try{if(editId)await axios.put(API+"/"+editId,{...form,roll:Number(form.roll)});else await axios.post(API,{...form,roll:Number(form.roll)});setForm(blank);setEditId(null);setMessage("Saved successfully");load()}catch(e){setMessage(e.response?.data?.message||"Operation failed")}};
 const edit=s=>{setEditId(s._id);setForm({name:s.name,roll:String(s.roll),course:s.course})};
 const del=async id=>{try{await axios.delete(API+"/"+id);setMessage("Deleted");load()}catch(e){setMessage(e.response?.data?.message||"Delete failed")}};
 return <div className="card"><h1>Student CRUD</h1>{["name","roll","course"].map(k=><input key={k} name={k} placeholder={k} value={form[k]} onChange={change}/>)}<button onClick={save}>{editId?"Update":"Save"}</button><button onClick={()=>{setForm(blank);setEditId(null)}}>Clear</button><p>{message}</p><h2>Student List</h2><ul>{students.map(s=><li key={s._id}>{s.name} - {s.roll} - {s.course} <button onClick={()=>edit(s)}>Edit</button><button onClick={()=>del(s._id)}>Delete</button></li>)}</ul></div>
}
