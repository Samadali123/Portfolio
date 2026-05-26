'use client';

import { usePathname } from 'next/navigation';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') ?? false;

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="grow">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </div>
  );
}
