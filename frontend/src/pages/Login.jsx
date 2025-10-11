import { useState } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" type="email" placeholder="Email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" type="password" placeholder="Password" required />
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? 'Please wait...' : 'Login'}</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
}