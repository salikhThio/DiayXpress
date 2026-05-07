'use client'

import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import PhilosophySection from '@/components/landing/PhilosophySection'
import ProtocolSection from '@/components/landing/ProtocolSection'
import PricingSection from '@/components/landing/PricingSection'
import CTASection from '@/components/landing/CTASection'
import FooterSection from '@/components/landing/FooterSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F0E9]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PhilosophySection />
        <ProtocolSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  )
}
