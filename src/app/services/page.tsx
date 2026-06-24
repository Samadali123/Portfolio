import type { Metadata } from 'next';
import Services from '@/views/Services';

export const metadata: Metadata = {
  title: 'IT Services',
  description: 'Enterprise AI automation, cloud infrastructure, data pipelines, and custom software. Proven results across 3 countries.',
};

export default function Page() {
  return <Services />;
}
