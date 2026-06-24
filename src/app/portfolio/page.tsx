import type { Metadata } from 'next';
import Portfolio from '@/views/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'See how we delivered 40% cost reduction, 3x performance gains, and 2M+ data pipelines. Real results from real clients.',
};

export default function Page() {
  return <Portfolio />;
}
