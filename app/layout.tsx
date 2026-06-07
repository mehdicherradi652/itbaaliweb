import './globals.css';
import type { Metadata } from 'next';
import { Inter, Tajawal } from 'next/font/google';
import { LanguageProvider } from '@/providers/language-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'ITBAALI - Publicité, Impression & Design Graphique | Tanger, Maroc',
  description: 'ITBAALI est votre partenaire de confiance pour tous vos besoins en publicité, impression et design graphique à Tanger, Maroc. Services professionnels de logo, cartes de visite, flyers, brochures, et plus.',
  keywords: 'publicité Tanger, impression Maroc, design graphique, logo, cartes de visite, flyers, brochures, bannières, ITBAALI',
  authors: [{ name: 'ITBAALI' }],
  openGraph: {
    title: 'ITBAALI - Publicité, Impression & Design Graphique',
    description: 'Votre partenaire créatif à Tanger pour tous vos besoins en publicité et impression.',
    url: 'https://itbaali.com',
    siteName: 'ITBAALI',
    type: 'website',
    locale: 'fr_MA',
    images: [
      {
        url: 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'ITBAALI - Publicité et Impression',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITBAALI - Publicité, Impression & Design Graphique',
    description: 'Votre partenaire créatif à Tanger pour tous vos besoins en publicité et impression.',
    images: ['https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <WhatsAppButton />
          </div>
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
