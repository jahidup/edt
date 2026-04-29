'use client';
import { useEffect, useState } from 'react';
import { API, authHeaders } from '../../lib/api';

export default function Dashboard() {
  const [me, setMe] = useState(null); const [enrollments, setEnrollments] = useState([]);
  useEffect(() => { (async () => {
    const u = await (await fetch(`${API}/users/me`, { headers: authHeaders() })).json(); setMe(u);
    const e = await (await fetch(`${API}/users/me/enrollments`, { headers: authHeaders() })).json(); setEnrollments(e);
  })(); }, []);
  return <main className='container-x py-12'><h1 className='text-3xl font-bold'>Student Dashboard</h1><div className='card mt-4'><p>Name: {me?.name}</p><p>Email: {me?.email}</p></div><h2 className='text-xl mt-6 mb-3'>Course Interests</h2>{enrollments.map(e => <div key={e._id} className='card mt-2'>{e.course?.title} - {e.status}</div>)}</main>;
}
