'use client';
import { useEffect, useState } from 'react';
import { API, authHeaders } from '../../lib/api';

export default function Admin() {
  const [courses, setCourses] = useState([]); const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ title:'', slug:'', description:'', price:0, duration:'', mode:'Online', batchTimings:['Morning'] });
  const load = async () => { setCourses(await (await fetch(`${API}/courses`)).json()); setLeads(await (await fetch(`${API}/leads`, { headers: authHeaders() })).json()); };
  useEffect(() => { load(); }, []);
  const addCourse = async () => { await fetch(`${API}/courses`, { method:'POST', headers:{'Content-Type':'application/json', ...authHeaders()}, body: JSON.stringify(form)}); load(); };
  return <main className='container-x py-12'><h1 className='text-3xl font-bold mb-4'>Admin Panel</h1><div className='card'><h2>Add Course</h2><input className='bg-deep3 p-2 rounded w-full mt-2' placeholder='Title' onChange={e=>setForm({...form,title:e.target.value})}/><button className='bg-gold text-black px-4 py-2 rounded mt-3' onClick={addCourse}>Save</button></div><h2 className='text-2xl mt-8'>Leads</h2>{leads.map(l=><div key={l._id} className='card mt-2'>{l.courseName} | {l.name} | {l.email} | {l.selectedBatch}</div>)}</main>;
}
