import { Roboto } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'Quiz Generator',
  description: 'A very simple Quiz Generator',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${roboto.className} antialiased container mx-auto px-4`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
