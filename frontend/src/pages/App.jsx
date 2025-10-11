import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Appointments from './Appointments.jsx';

const Private = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Private><Dashboard /></Private>} />
          <Route path="/appointments" element={<Private><Appointments /></Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}