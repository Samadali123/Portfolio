import type { Metadata } from 'next';
import Services from '@/views/Services';

export const metadata: Metadata = {
  title: 'IT Services',
  description: 'Explore ASG Solutions services including custom software development, AI application development, data-driven solutions, and business consultation.',
};

export default function Page() {
  return <Services />;
}
