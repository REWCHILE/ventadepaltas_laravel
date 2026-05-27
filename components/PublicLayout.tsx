import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollProgressIndicator from './ScrollProgressIndicator'
import ViewportObserver from './ViewportObserver'
import MascotWidget from './MascotWidget'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 public-site">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
      <ScrollProgressIndicator />
      <ViewportObserver />
      <MascotWidget />
    </div>
  )
}
