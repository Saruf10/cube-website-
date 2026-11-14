import type { Metadata } from 'next';
import { Inter, Manrope, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import PublicShellWrapper from '@/components/layout/PublicShellWrapper';
import LegacyCacheCleanup from '@/components/common/LegacyCacheCleanup';
import { contactInfo } from '@/data/contact';

// Structured data so search engines show CUBE's name, logo, address and contacts.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ResearchOrganization',
  name: contactInfo.organization,
  alternateName: 'CUBE',
  url: 'https://cubeiitm.org',
  logo: 'https://cubeiitm.org/images/branding/cube-live-logo.png',
  foundingDate: '2017-05',
  description:
    'Applied Technology, Consultancy, Advisory and Research Centre raised by IIT Madras and the Government of Tamil Nadu.',
  email: contactInfo.email,
  telephone: '+91-44-6121-0901',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Module No.6C, 6th Floor, Phase II Building, IIT Madras Research Park, Kanagam Road, Taramani',
    addressLocality: 'Chennai',
    postalCode: '600113',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: Object.values(contactInfo.socialLinks),
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cubeiitm.org'),
  title: 'CUBE | Centre for Urbanization, Buildings & Environment (IIT Madras & Govt of TN)',
  description: 'Centre of Excellence established jointly by the Government of Tamil Nadu and IIT Madras. Leading applied research, engineering consultancy, third-party quality assurance, environmental testing (CEL), and sustainable urban mobility.',
  keywords: [
    'CUBE IIT Madras',
    'Centre for Urbanization Buildings and Environment',
    'Government of Tamil Nadu Centre of Excellence',
    'Structural Engineering Consultancy',
    'Third Party Quality Assurance TPQA',
    'CUBE Environmental Laboratory CEL',
    'Urban Planning Chennai',
    'Precast Housing Engineering'
  ],
  authors: [{ name: 'CUBE IIT Madras' }],
  openGraph: {
    title: 'CUBE - Centre for Urbanization, Buildings & Environment',
    description: 'Centre of Excellence of the Government of Tamil Nadu and IIT Madras for applied engineering, sustainable infrastructure, and smart urbanization.',
    url: 'https://cubeiitm.org',
    siteName: 'CUBE Digital Experience 2.0',
    images: [
      {
        url: '/images/hero/slides_iit-tirupathi.jpg',
        width: 1920,
        height: 990,
        alt: 'CUBE project: IIT Tirupati permanent campus',
      },
      {
        url: '/images/branding/cube-live-logo.png',
        width: 300,
        height: 60,
        alt: 'Official CUBE Emblem - IIT Madras & Govt of Tamil Nadu',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CUBEatIITM',
    images: ['/images/hero/slides_iit-tirupathi.jpg'],
  },
  icons: {
    icon: '/images/branding/cube-live-logo.png',
    apple: '/images/branding/cube-live-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1F2633] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <LegacyCacheCleanup />
        <PublicShellWrapper>{children}</PublicShellWrapper>
      </body>
    </html>
  );
}
