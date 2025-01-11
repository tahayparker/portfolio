'use client';
import { DM_Mono } from 'next/font/google'
import './globals.css'
import { useState, useEffect } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

type ThemeType = 'dark' | 'light' | 'mono';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || systemTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove('dark', 'light', 'mono');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return (
      <html lang="en" className="dark">
        <body className={`${dmMono.variable} font-mono bg-background`} />
      </html>
    );
  }

  return (
    <html lang="en" className={theme}>
      <head>
      <meta name="apple-mobile-web-app-title" content="Taha Parker" />
      </head>
      <body className={`${dmMono.variable} font-mono bg-background text-foreground`}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <AnimatePresence mode="wait">
            <PageTransition>
              {children}
            </PageTransition>
          </AnimatePresence>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}