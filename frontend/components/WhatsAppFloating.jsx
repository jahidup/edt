import { waLink } from '../lib/wa';
export default function WhatsAppFloating() {
  return <a href={waLink('Hello, I need guidance for course enrollment.')} target='_blank' className='fixed bottom-6 right-6 bg-green-500 rounded-full px-5 py-3 font-semibold shadow-2xl'>Talk to Counselor</a>;
}
