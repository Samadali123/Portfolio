import type { Metadata } from 'next';
import Portfolio from '@/views/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'View ASG Solutions case studies and projects across enterprise AI automation, cloud transformation, data intelligence, and modern software platforms.',
};

export default function Page() {
  return <Portfolio />;
}
