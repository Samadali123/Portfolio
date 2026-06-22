import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact ASG Solutions to discuss software development, AI automation, data solutions, cloud strategy, or business technology consultation.',
};

export default function Page() {
  return <Contact />;
}
