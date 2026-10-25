import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [form, setForm] = useState({ name: "", roll: "", course: "" });
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const load = async () => {
    try {
      setStudents((await axios.get("http://localhost:5000/student")).data);
    } catch {
      setMessage("Check backend and MongoDB.");
    }
  };
  useEffect(() => {
    load();
  }, []);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = async () => {
    try {
      await axios.post(API, { ...form, roll: Number(form.roll) });
      setForm({ name: "", roll: "", course: "" });
      setMessage("Student saved");
      load();
    } catch (e) {
      setMessage(e.response?.data?.message || "Save failed");
    }
  };
  return (
    <div className="card">
      <h1>Student Registration (Create / Read)</h1>
      {["name", "roll", "course"].map((k) => (
        <input
          key={k}
          name={k}
          placeholder={k}
          value={form[k]}
          onChange={change}
        />
      ))}
      <button onClick={save}>Save</button>
      <p>{message}</p>
      <h2>Student List</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} - {s.roll} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App();
