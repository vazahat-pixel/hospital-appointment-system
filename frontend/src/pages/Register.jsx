import { useState } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'patient', specialization:'', phone:'' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input name="name" value={form.name} onChange={onChange} className="w-full border p-2 rounded" placeholder="Full Name" required />
        <input name="email" value={form.email} onChange={onChange} className="w-full border p-2 rounded" type="email" placeholder="Email" required />
        <input name="password" value={form.password} onChange={onChange} className="w-full border p-2 rounded" type="password" placeholder="Password" required />
        <select name="role" value={form.role} onChange={onChange} className="w-full border p-2 rounded">
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {form.role === 'doctor' && (
          <input name="specialization" value={form.specialization} onChange={onChange} className="w-full border p-2 rounded" placeholder="Specialization (for doctors)" />
        )}
        <input name="phone" value={form.phone} onChange={onChange} className="w-full border p-2 rounded" placeholder="Phone" />
        <button disabled={loading} className="w-full bg-gray-900 text-white py-2 rounded">{loading ? 'Please wait...' : 'Create account'}</button>
      </form>
      <p className="mt-3 text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
}