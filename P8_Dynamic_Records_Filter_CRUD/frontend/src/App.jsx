import { useEffect, useState } from "react";
const API="http://localhost:5000/api/students", blank={name:"",email:"",course:"",city:""};
export default function App(){
 const [students,setStudents]=useState([]),[form,setForm]=useState(blank),[editId,setEditId]=useState(null),[search,setSearch]=useState(""),[message,setMessage]=useState("");
 const load=async()=>{try{const r=await fetch(API);const d=await r.json();if(!r.ok)throw Error(d.message);setStudents(d)}catch(e){setMessage(e.message||"Check backend and MongoDB")}};
 useEffect(()=>{load()},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const save=async e=>{e.preventDefault();try{const r=await fetch(editId?API+"/"+editId:API,{method:editId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw Error(d.message);setMessage(editId?"Student updated":"Student added");setForm(blank);setEditId(null);load()}catch(e){setMessage(e.message||"Operation failed")}};
 const del=async id=>{if(!window.confirm("Delete this student?"))return;try{const r=await fetch(API+"/"+id,{method:"DELETE"});const d=await r.json();if(!r.ok)throw Error(d.message);setMessage(d.message);load()}catch(e){setMessage(e.message)}};
 const filtered=students.filter(s=>(s.name+" "+s.course+" "+s.city).toLowerCase().includes(search.toLowerCase()));
 const edit=s=>{setEditId(s._id);setForm({name:s.name,email:s.email,course:s.course,city:s.city})};
 return <div className="card"><h1>Student Management</h1><input placeholder="Search name, course or city" value={search} onChange={e=>setSearch(e.target.value)}/>
 <h2>{editId?"Update Student":"Add Student"}</h2><form onSubmit={save}>{["name","email","course","city"].map(k=><input key={k} name={k} placeholder={k} type={k==="email"?"email":"text"} value={form[k]} onChange={change} required/>)}<button>{editId?"Update Student":"Add Student"}</button><button type="button" onClick={()=>{setForm(blank);setEditId(null)}}>Clear</button></form><p>{message}</p>
 <h2>Student Records ({filtered.length})</h2><table><thead><tr><th>Name</th><th>Email</th><th>Course</th><th>City</th><th>Actions</th></tr></thead><tbody>{filtered.length===0?<tr><td colSpan="5">No records found</td></tr>:filtered.map(s=><tr key={s._id}><td>{s.name}</td><td>{s.email}</td><td>{s.course}</td><td>{s.city}</td><td><button onClick={()=>edit(s)}>Edit</button><button onClick={()=>del(s._id)}>Delete</button></td></tr>)}</tbody></table></div>
}
