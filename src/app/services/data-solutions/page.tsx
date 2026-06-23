import type { Metadata } from 'next';
import DataSolutions from '@/views/services/DataSolutions';

export const metadata: Metadata = {
  title: 'Data Solutions',
  description: 'Turn your raw data into decisions that drive growth. Real-time analytics, automated pipelines, and dashboards.',
};

export default function Page() {
  return <DataSolutions />;
}
