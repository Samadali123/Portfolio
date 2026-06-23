import type { Metadata } from 'next';
import Blog from '@/views/Blog';

export const metadata: Metadata = {
  title: 'Blog | Insights & Engineering',
  description: 'Expert perspectives on AI, cloud infrastructure, data engineering, and modern software development.',
};

export default function Page() {
  return <Blog />;
}
