import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import MainLayout from './_components/main-layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vanish Poll',
  description: 'Generated your polls with vanish poll',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
