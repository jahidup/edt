'use client';
import Link from 'next/link';
export default function Navbar() {
  return <nav className='sticky top-0 z-50 bg-deep1/90 backdrop-blur border-b border-white/10'><div className='container-x flex items-center justify-between py-4'><Link href='/' className='text-gold font-bold text-xl'>IT Institute</Link><div className='flex gap-5 text-sm'><Link href='/courses'>Courses</Link><Link href='/#about'>About</Link><Link href='/#contact'>Contact</Link><Link href='/auth'>LMS Login</Link></div></div></nav>;
}
