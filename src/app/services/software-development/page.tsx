import type { Metadata } from 'next';
import SoftwareDevelopment from '@/views/services/SoftwareDevelopment';

export const metadata: Metadata = {
  title: 'Software Development',
  description: 'Custom software that scales with your business. Web apps, mobile platforms, SaaS solutions, internal tools.',
};

export default function Page() {
  return <SoftwareDevelopment />;
}
