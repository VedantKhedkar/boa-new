import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: 'Best of Amravati | Civic Business Directory Portal',
  description:
    'Discover best 5 verified local business categories, certified enterprises, and community favorites across Amravati, Maharashtra.',
  icons: {
    icon: '/boalogo.svg',
    shortcut: '/boalogo.svg',
    apple: '/boalogo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
        <Header />
        <main className="w-full pt-14 sm:pt-16 flex-grow">{children}</main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
