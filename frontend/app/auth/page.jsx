'use client';
import { useState } from 'react';
import { API } from '../../lib/api';

export default function AuthPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const register = async () => { await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); alert('OTP sent'); };
  const verify = async () => { await fetch(`${API}/auth/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, otp: form.otp }) }); alert('Verified'); };
  const login = async () => { const r = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); localStorage.setItem('token', d.token); localStorage.setItem('user', JSON.stringify(d.user)); location.href='/dashboard'; };
  return <main className='container-x py-12'><div className='card max-w-lg mx-auto space-y-3'><h1 className='text-2xl font-bold'>LMS Login / Register</h1>{['name','email','password','otp'].map(f => <input key={f} className='w-full bg-deep3 p-2 rounded' placeholder={f} type={f==='password'?'password':'text'} onChange={e=>setForm({...form,[f]:e.target.value})} />)}<div className='grid grid-cols-3 gap-2'><button className='bg-gold text-black p-2 rounded' onClick={register}>Register</button><button className='bg-white/20 p-2 rounded' onClick={verify}>Verify OTP</button><button className='bg-white/20 p-2 rounded' onClick={login}>Login</button></div></div></main>;
}
