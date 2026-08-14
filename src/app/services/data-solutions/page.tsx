import type { Metadata } from 'next';
import DataSolutions from '@/views/services/DataSolutions';

export const metadata: Metadata = {
  title: 'Data Solutions',
  description: 'Reliable data pipelines, dashboards, and analytics that turn raw data into decisions that save money and increase revenue.',
};

export default function Page() {
  return <DataSolutions />;
}
