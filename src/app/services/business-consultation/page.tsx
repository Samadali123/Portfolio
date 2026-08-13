import type { Metadata } from 'next';
import BusinessConsultation from '@/views/services/BusinessConsultation';

export const metadata: Metadata = {
  title: 'Business Consultation',
  description: 'AI-first business consultation focused on high-ROI automation, cost reduction and scalable processes.',
};

export default function Page() {
  return <BusinessConsultation />;
}
