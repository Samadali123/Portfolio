import type { Metadata } from 'next';
import AdminAuth from '@/views/AdminAuth';

export const metadata: Metadata = {
  title: 'Reset Admin Password',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AdminAuth mode="reset" />;
}
