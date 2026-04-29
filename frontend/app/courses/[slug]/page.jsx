import { API } from '../../../lib/api';
import CourseCard from '../../../components/CourseCard';

export default async function CourseDetail({ params }) {
  const r = await fetch(`${API}/courses/${params.slug}`, { cache: 'no-store' });
  const c = await r.json();
  return <main className='container-x py-12'><h1 className='text-4xl font-bold'>{c.title}</h1><p className='mt-2 text-white/80'>{c.description}</p><div className='grid md:grid-cols-2 gap-4 mt-6'><div className='card'><p>Price: ₹{c.price}</p><p>Duration: {c.duration}</p><p>Mode: {c.mode}</p><p>Batch: {(c.batchTimings || []).join(', ')}</p></div><CourseCard course={c} /></div></main>;
}
