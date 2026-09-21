import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import ReactQueryProvider from './providers/ReactQueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Movie Explorer',
    template: '%s | Movie Explorer',
  },
  description: 'Aplikasi pencarian movie menggunakan Next.js dan TMDB API.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
