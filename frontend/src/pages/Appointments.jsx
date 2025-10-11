import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [mine, setMine] = useState([]);
  const [form, setForm] = useState({ doctorId: '', date: '', reason: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const load = async () => {
    try {
      const docs = await api.get('/users?role=doctor');
      setDoctors(docs.data);
      const { data } = await api.get('/appointments/mine');
      setMine(data);
    } catch (e) {}
  };
  useEffect(() => { load(); }, []);

  const book = async (e) => {
    e.preventDefault();
    await api.post('/appointments', form);
    setForm({ doctorId: '', date: '', reason: '' });
    await load();
  };
  const cancel = async (id) => {
    await api.patch(`/appointments/${id}/cancel`);
    await load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Book Appointment</h2>
        {user.role === 'patient' ? (
          <form onSubmit={book} className="space-y-3">
            <select name="doctorId" value={form.doctorId} onChange={onChange} className="w-full border p-2 rounded" required>
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d._id} value={d._id}>{d.name} — {d.specialization || 'General'}</option>)}
            </select>
            <input name="date" type="datetime-local" value={form.date} onChange={onChange} className="w-full border p-2 rounded" required />
            <input name="reason" value={form.reason} onChange={onChange} className="w-full border p-2 rounded" placeholder="Reason (optional)" />
            <button className="w-full bg-blue-600 text-white py-2 rounded">Book</button>
          </form>
        ) : (
          <p className="text-gray-600">Doctors can view/cancel their appointments below.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-3">My Appointments</h2>
        <div className="space-y-3">
          {mine.map(a => (
            <div key={a._id} className="border rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{a.reason || 'Checkup'}</p>
                <p className="text-sm text-gray-600">
                  {user.role === 'doctor' ? `Patient: ${a.patient?.name}` : `Doctor: ${a.doctor?.name}`}
                </p>
                <p className="text-sm">{new Date(a.date).toLocaleString()} — <span className="uppercase">{a.status}</span></p>
              </div>
              {a.status === 'scheduled' && (
                <button onClick={() => cancel(a._id)} className="px-3 py-1 rounded bg-red-600 text-white">Cancel</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}