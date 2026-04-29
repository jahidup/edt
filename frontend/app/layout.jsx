import './globals.css';
import Navbar from '../components/Navbar';
import WhatsAppFloating from '../components/WhatsAppFloating';

export const metadata = { title: 'Premium IT Training Institute', description: 'Modern LMS-style IT training platform' };

export default function RootLayout({ children }) {
  return <html><body><Navbar />{children}<WhatsAppFloating /></body></html>;
}
