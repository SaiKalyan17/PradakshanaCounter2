import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', count: '' });
  const [total, setTotal] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/submit', {
        name: form.name,
        count: Number(form.count)
      });
      setTotal(res.data.total);
      setForm({ name: '', count: '' });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🛕 Pradakshana Counter</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input name="count" type="number" placeholder="Pradakshana count" value={form.count} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
        {total !== null && <h3>Total Pradakshanas: {total}</h3>}
      </div>
    </div>
  );
}

export default App;
