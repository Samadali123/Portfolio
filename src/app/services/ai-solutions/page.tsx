import type { Metadata } from 'next';
import AISolutions from '@/views/services/AISolutions';

export const metadata: Metadata = {
  title: 'AI Solutions',
  description: 'Automate workflows and build custom AI systems that integrate with your existing infrastructure.',
};

export default function Page() {
  return <AISolutions />;
}
