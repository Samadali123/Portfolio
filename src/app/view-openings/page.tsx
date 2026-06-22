import type { Metadata } from 'next';
import OpenPositions from '@/views/OpenPositions';

export const metadata: Metadata = {
  title: 'Open Positions',
  description: 'Browse current job openings at ASG Solutions and apply for roles in software development, AI, data, cloud, and business technology.',
};

export default function Page() {
  return <OpenPositions />;
}
