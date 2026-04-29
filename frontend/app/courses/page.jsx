import CourseCard from '../../components/CourseCard';
import { API } from '../../lib/api';

async function getCourses() { const r = await fetch(`${API}/courses`, { cache: 'no-store' }); return r.json(); }

export default async function CoursesPage() {
  const courses = await getCourses();
  return <main className='container-x py-12'><h1 className='text-4xl font-bold mb-6'>Courses</h1><div className='grid md:grid-cols-3 gap-4'>{courses.map(c => <CourseCard key={c._id} course={c} />)}</div></main>;
}
