import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stratega AI',
  description: 'Generate focused weekly content calendars from a clear brand and campaign brief.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
