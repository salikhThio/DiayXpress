'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.2 }
      })

      tl.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        delay: 0.3,
      })
      .from('.hero-title-sans', {
        y: 40,
        opacity: 0,
      }, '-=0.8')
      .from('.hero-title-serif', {
        y: 40,
        opacity: 0,
      }, '-=0.8')
      .from('.hero-cta', {
        y: 40,
        opacity: 0,
      }, '-=0.7')
      .from('.hero-tag', {
        y: 20,
        opacity: 0,
      }, '-=0.5')

      // Subtle parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&auto=format')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2E4036] via-[#2E4036]/60 to-[#1A1A1A]/40" />

      {/* Decorative top-right accent */}
      <div className="absolute top-20 right-10 w-24 h-24 border border-[#CC5833]/10 rounded-full hidden md:block" />
      <div className="absolute top-28 right-20 w-12 h-12 border border-[#F2F0E9]/5 rounded-full hidden md:block" />

      {/* Content - pushed to lower third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 md:pb-24">
        {/* Subtitle tag */}
        <p
          className="hero-subtitle text-[#F2F0E9]/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Livraison urbaine • Dakar
        </p>

        {/* Hero Title */}
        <h1 className="mb-8">
          <span
            className="hero-title-sans block text-[#F2F0E9] text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-plus-jakarta)' }}
          >
            DiayXpress est le
          </span>
          <span
            className="hero-title-serif block text-[#CC5833] text-5xl sm:text-8xl md:text-[10rem] italic leading-[0.9] mt-1 md:mt-2"
            style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
          >
            Mouvement.
          </span>
        </h1>

        {/* CTA Button */}
        <a
          href="#pricing"
          className="hero-cta btn-magnetic inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#CC5833] text-[#F2F0E9] text-sm font-semibold tracking-tight rounded-full"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <span className="btn-bg-layer bg-[#2E4036] rounded-full" />
          <span className="btn-text">Commander une course</span>
          <svg className="btn-text w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Bottom tag */}
        <p
          className="hero-tag text-[#F2F0E9]/30 text-[10px] sm:text-xs mt-6 sm:mt-8"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Colis livrés en 2 heures • Précision du dernier kilomètre
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hero-tag">
        <span className="text-[#F2F0E9]/20 text-[10px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#F2F0E9]/30 to-transparent" />
      </div>
    </section>
  )
}
