'use client';
import { useState } from 'react';
import { buildWhatsAppMessage, waLink } from '../lib/wa';
import { API, authHeaders } from '../lib/api';

export default function CourseCard({ course, user }) {
  const [batch, setBatch] = useState(course.batchTimings?.[0] || 'Morning');
  const enroll = async () => {
    const payload = { course: course._id, courseName: course.title, price: course.price, name: user?.name, email: user?.email, selectedBatch: batch };
    await fetch(`${API}/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(payload) });
    window.open(waLink(buildWhatsAppMessage({ courseName: course.title, price: course.price, name: user?.name, email: user?.email, batch })), '_blank');
  };
  return <div className='card'><div className='flex justify-between'><h3 className='text-xl font-semibold'>{course.title}</h3>{course.limitedSeats && <span className='text-xs bg-gold text-black rounded-full px-2 py-1'>Limited Seats</span>}</div><p className='text-white/80 mt-2'>{course.description}</p><p className='mt-4 text-gold font-bold'>₹{course.price}</p><select className='mt-3 w-full bg-deep3 p-2 rounded' value={batch} onChange={e => setBatch(e.target.value)}>{(course.batchTimings || []).map(b => <option key={b}>{b}</option>)}</select><button onClick={enroll} className='mt-4 w-full bg-gold text-black font-semibold py-2 rounded-xl'>Enroll via WhatsApp</button></div>;
}
