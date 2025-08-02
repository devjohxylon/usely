import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usely - AI Usage Metering & Billing Platform',
  description: 'Meter, analyze and bill your AI usage — instantly. Unify token tracking and usage-based billing for any LLM provider like OpenAI, Anthropic, and Mistral.',
  keywords: ['AI billing', 'LLM metering', 'OpenAI billing', 'Anthropic billing', 'token tracking', 'usage-based billing', 'AI API management'],
  authors: [{ name: 'Usely Team' }],
  creator: 'Usely',
  publisher: 'Usely',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://usely.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Usely - AI Usage Metering & Billing Platform',
    description: 'Meter, analyze and bill your AI usage — instantly. Unify token tracking and usage-based billing for any LLM provider.',
    url: 'https://usely.dev',
    siteName: 'Usely',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Usely - AI Usage Metering & Billing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usely - AI Usage Metering & Billing Platform',
    description: 'Meter, analyze and bill your AI usage — instantly. Unify token tracking and usage-based billing for any LLM provider.',
    images: ['/og-image.png'],
    creator: '@usely_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/uselylogobg.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Usely",
              "description": "AI usage metering and billing platform for LLM providers",
              "url": "https://usely.dev",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="antialiased text-white">
        {children}
      </body>
    </html>
  )
} 