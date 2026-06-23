import type { Metadata } from 'next';
import Cloud from '@/views/services/Cloud';

export const metadata: Metadata = {
  title: 'Business Consultation',
  description: 'Strategic guidance for cloud solutions, system design, and digital transformation.',
};

export default function Page() {
  return <Cloud />;
}
