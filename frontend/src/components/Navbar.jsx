import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => setAuthed(!!localStorage.getItem('token'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthed(false);
    navigate('/login');
  };
  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Hospital</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          {authed && <Link to="/appointments" className="hover:underline">Appointments</Link>}
          {!authed ? (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-gray-800 text-white">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-1 rounded bg-red-600 text-white">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}