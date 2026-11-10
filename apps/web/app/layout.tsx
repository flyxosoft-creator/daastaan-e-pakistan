import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://daastaanepakistan.com'),
  title: {
    default: 'Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories.',
    template: '%s | Daastaan-e-Pakistan',
  },
  description:
    'Connect with verified local guides for authentic cultural, culinary & nature experiences across Pakistan. Book curated tours in Lahore, Islamabad, Karachi, and beyond.',
  keywords: [
    'Pakistan tourism',
    'local guides Pakistan',
    'cultural tours Pakistan',
    'food tours Lahore',
    'Islamabad tours',
    'travel Pakistan',
  ],
  authors: [{ name: 'Daastaan-e-Pakistan' }],
  creator: 'Daastaan-e-Pakistan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://daastaanepakistan.com',
    siteName: 'Daastaan-e-Pakistan',
    title: 'Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories.',
    description:
      'Authentic local experiences across Pakistan with verified guides.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daastaan-e-Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daastaan-e-Pakistan',
    description: 'Discover Pakistan. Live Its Stories.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#123C2D',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://js.stripe.com/dahlia/stripe.js" async></script>
      </head>
      <body className="font-sans antialiased bg-[#FAF6ED] text-gray-800 selection:bg-[#B99550] selection:text-white">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#292D2A',
                color: '#F7F3E9',
                border: '1px solid #B99550',
              },
            }}
            richColors
          />
        </Providers>
      </body>
    </html>
  );
}
