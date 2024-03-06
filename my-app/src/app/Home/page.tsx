export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Header from '@/components/Header'
import Contact from '@/components/contactForm'

export default function Home() {
  
  return (
    
    <>
      <Header />
      <Hero />
      <Features />
      <Contact />

    </>
  )
}
