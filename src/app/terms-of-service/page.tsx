import type { Metadata } from 'next';
import TermsOfService from '@/views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the ASG Solutions terms of service for using our website, consulting, software development, AI, cloud, and data solution services.',
};

export default function Page() {
  return <TermsOfService />;
}
