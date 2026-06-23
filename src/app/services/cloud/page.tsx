import type { Metadata } from 'next';
import Cloud from '@/views/services/Cloud';

export const metadata: Metadata = {
  title: 'Cloud & Infrastructure Solutions',
  description: 'Scale without the headaches. AWS, Azure, GCP expertise. Migration, optimization, 24/7 monitoring, and cost control.',
};

export default function Page() {
  return <Cloud />;
}
