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
      { url: '../assets/images/faviconlogo.png', type: 'image/png' },
    ],
    shortcut: '../assets/images/faviconlogo.png',
    apple: '../assets/images/faviconlogo.png',
  },
  openGraph: {
    title: 'ASG Solutions | Smart Cloud, AI & Software Solutions',
    description: 'Smart cloud, AI, and software solutions for growing businesses.',
    siteName: 'ASG Solutions',
    type: 'website',
    images: [
      {
        url: '../assets/images/faviconlogo.png',
        alt: 'ASG Solutions logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ASG Solutions | Smart Cloud, AI & Software Solutions',
    description: 'Smart cloud, AI, and software solutions for growing businesses.',
    images: ['../assets/images/faviconlogo.png'],
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
