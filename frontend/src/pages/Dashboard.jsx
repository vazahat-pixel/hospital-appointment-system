import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('user') || '{}')?.role);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const { data } = await api.get('/users?role=doctor');
        setDoctors(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {role}</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {doctors.map(d => (
          <div key={d._id} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-lg">{d.name}</h3>
            <p className="text-sm text-gray-600">{d.specialization || 'General'}</p>
            <p className="text-sm text-gray-600">{d.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}