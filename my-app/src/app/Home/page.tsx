export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Header from '@/components/Header'
import Contact from '@/components/contactForm'

export default function Home() {
  
  return (
    
    <>
      <Header />
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Contact />

    </>
  )
}
