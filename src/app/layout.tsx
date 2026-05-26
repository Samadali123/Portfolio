import type { Metadata } from 'next';
import './globals.css';
import ClientShell from './ClientShell';

export const metadata: Metadata = {
  title: 'ASG Solutions',
  description: 'Smart cloud, AI, and software solutions for growing businesses.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
