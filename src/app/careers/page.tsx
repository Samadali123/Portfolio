import type { Metadata } from 'next';
import Careers from '@/views/Careers';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join ASG Solutions and build modern cloud, AI, data, and software products with a team focused on practical business impact.',
};

export default function Page() {
  return <Careers />;
}
