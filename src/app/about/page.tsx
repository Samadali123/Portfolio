import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ASG Solutions, our mission, values, and journey helping businesses grow with cloud, AI, data, and software engineering.',
};

export default function Page() {
  return <About />;
}
