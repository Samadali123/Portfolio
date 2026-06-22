import type { Metadata } from 'next';
import AdminDashboard from '@/views/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AdminDashboard />;
}
