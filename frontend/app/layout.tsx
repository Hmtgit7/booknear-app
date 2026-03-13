import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Icon } from '@/icons';

// ── Fonts ─────────────────────────────────────────────────────────────────────
// Outfit: primary UI font — clean, modern, great for Indian healthcare apps
// JetBrains Mono: data tables / code

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'DocNear — Find Verified Doctors Near You',
    template: '%s · DocNear',
  },
  description:
    'Hyperlocal verified doctor discovery for Tier 2/3 India. Book appointments, manage prescriptions, and access your health records.',
  keywords: ['doctor', 'appointment', 'healthcare', 'India', 'Nagda', 'DocNear'],
  authors: [{ name: 'DocNear' }],
  creator: 'DocNear',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.docnear.in'),
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'DocNear' },
  robots: { index: true, follow: true },
  icons: './icon.svg',
};

export const viewport: Viewport = {
  themeColor: '#14b8a6',
  width: 'device-width',
  initialScale: 1,
};

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
