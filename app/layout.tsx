import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CurtiMotors | Veículos Premium de Alto Padrão',
    template: '%s | CurtiMotors',
  },
  description: 'Revenda de automóveis premium. Encontre veículos de luxo das melhores marcas: Porsche, Ferrari, Mercedes-Benz, BMW e mais. Qualidade e confiança em cada negociação.',
  keywords: ['carros de luxo', 'veículos premium', 'revenda de automóveis', 'Porsche', 'Ferrari', 'Mercedes-Benz', 'BMW', 'carros usados premium'],
  authors: [{ name: 'CurtiMotors' }],
  creator: 'CurtiMotors',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://curtimotors.com.br',
    siteName: 'CurtiMotors',
    title: 'CurtiMotors | Veículos Premium de Alto Padrão',
    description: 'Revenda de automóveis premium. Encontre veículos de luxo das melhores marcas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CurtiMotors - Veículos Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurtiMotors | Veículos Premium',
    description: 'Revenda de automóveis premium de alto padrão.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#C9A227' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
