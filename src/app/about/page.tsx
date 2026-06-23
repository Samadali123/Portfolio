import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the ASG Solutions team. Award-winning AI and cloud engineers building solutions for Fortune 500 clients.',
};

export default function Page() {
  return <About />;
}
