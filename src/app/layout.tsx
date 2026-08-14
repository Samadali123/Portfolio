import type { Metadata } from 'next';
import './globals.css';
import ClientShell from './ClientShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://asgsolutions.dev'),
  title: {
    default: 'ASG Solutions — AI Automation & ROI-driven Software',
    template: '%s | ASG Solutions',
  },
  description: 'AI Automation, Agents, and custom software that cut costs, save time, and increase revenue. Book a free 15‑min AI audit to find quick, measurable wins.',
  applicationName: 'ASG Solutions',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ASG Solutions — AI Automation & ROI-driven Software',
    description: 'AI-first automation, agents, and custom software that cut costs, save time, and increase revenue. Free 15‑min AI audit to uncover quick wins.',
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
    card: 'summary_large_image',
    title: 'ASG Solutions — AI Automation & ROI-driven Software',
    description: 'AI-first automation and software that delivers measurable savings and revenue growth. Book a free 15‑min AI audit.',
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
