import type { Metadata } from 'next';
import './globals.css';
import ClientShell from './ClientShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://asgsolutions.dev'),
  title: {
    default: 'ASG Solutions | Smart Cloud, AI & Software Solutions',
    template: '%s | ASG Solutions',
  },
  description: 'Smart cloud, AI, and software solutions for growing businesses.',
  applicationName: 'ASG Solutions',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ASG Solutions | Smart Cloud, AI & Software Solutions',
    description: 'Smart cloud, AI, and software solutions for growing businesses.',
    siteName: 'ASG Solutions',
    type: 'website',
    images: [
      {
        url: '/favicon.png',
        alt: 'ASG Solutions logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ASG Solutions | Smart Cloud, AI & Software Solutions',
    description: 'Smart cloud, AI, and software solutions for growing businesses.',
    images: ['/favicon.png'],
  },
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
