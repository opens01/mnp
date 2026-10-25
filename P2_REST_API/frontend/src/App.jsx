import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [students, setStudents] = useState([]);
 
  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(() => setError("Start the backend server first."));
  }, []);
  return <div className="card"><h1>Student Management System</h1><h2>Students List</h2>
  <ul>{students.map(s => <li key={s.id}>{s.name} - {s.course}</li>)}</ul></div>;
}
