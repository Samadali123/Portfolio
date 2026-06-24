import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get a free consultation with our AI and cloud experts. Response within 24 hours. WhatsApp, email, or calendar booking.',
};

export default function Page() {
  return <Contact />;
}
