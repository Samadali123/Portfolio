import type { Metadata } from 'next';
import Home from '@/views/Home';

export const metadata: Metadata = {
  title: 'Smart Cloud, AI & Software Solutions',
  description: 'Custom AI, cloud, and data systems for growing businesses. Faster than in-house, fraction of cost. Free consultation.',
};

export default function Page() {
  return <Home />;
}
