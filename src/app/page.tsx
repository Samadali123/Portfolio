import type { Metadata } from 'next';
import Home from '@/views/Home';

export const metadata: Metadata = {
  title: 'Smart Cloud, AI & Software Solutions',
  description: 'ASG Solutions helps growing businesses build scalable software, intelligent automation, cloud infrastructure, and data-driven digital products.',
};

export default function Page() {
  return <Home />;
}
