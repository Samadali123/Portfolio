import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the ASG Solutions privacy policy to understand how we collect, use, and protect information shared through our website and services.',
};

export default function Page() {
  return <PrivacyPolicy />;
}
