// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from './providers'

export const metadata: Metadata = {
  title: 'Learnpath — Learn Anything, All Inside',
  description: 'AI-powered personalised learning paths for any subject. Built by MRF Studios.',
  metadataBase: new URL('https://learnpathnow.com'),
  openGraph: {
    title: 'Learnpath',
    description: 'Learn anything with AI-generated curriculum, flashcards, and study mode.',
    url: 'https://learnpathnow.com',
    siteName: 'Learnpath',
    type: 'website',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
    <PostHogProvider>
        {children}
    </PostHogProvider>
  </body>
    </html>
  )
}
