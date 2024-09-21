// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GridCraft - CSS Grid Generator',
  description: 'Create and customize CSS grids easily with GridCraft. Generate code for CSS, Tailwind, or Bootstrap grids.',
  openGraph: {
    type: 'website',
    title: 'GridCraft - CSS Grid Generator',
    description: 'Create and customize CSS grids easily with GridCraft.',
    url: 'https://your-website.com',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'GridCraft Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GridCraft - CSS Grid Generator',
    description: 'Create and customize CSS grids easily with GridCraft.',
    images: '/twitter-image.jpg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        <body className="min-h-screen flex flex-col bg-gradient-to-r from-purple-600 to-blue-800 text-white">
          <Header />
          <main className="flex-grow container mx-auto p-4 z">
            {children}
          </main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
