import './globals.css'
import VisitorTracker from './components/VisitorTracker'


// Optimized font loading (simulated for standard Next.js without google fonts setup if offline, but we can try to use a google font url in head if needed, or just standard sans-serif fallback)
// For best results, we will modify this to use next/font/google if the user allows, but standard CSS import is easier for "teaching" context without complex setups.
// We used standard font-family 'Outfit' in CSS. We need to import it.

export const metadata = {
  title: 'Rental Super Car & Bikes',
  description: 'Premium Luxury Rentals and Modifications',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}
