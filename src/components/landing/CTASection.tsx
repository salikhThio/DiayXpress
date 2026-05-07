'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 sm:px-10 bg-[#2E4036] overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=80&auto=format')`,
        }}
      />
      <div className="absolute inset-0 bg-[#2E4036]/80" />

      <div className="cta-content relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="text-xs tracking-[0.3em] uppercase text-[#CC5833] mb-6 block"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Prêt ?
        </span>
        <h2
          className="text-3xl md:text-6xl text-[#F2F0E9] tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: 'var(--font-plus-jakarta)' }}
        >
          Votre colis n&apos;attend pas.
        </h2>
        <p
          className="text-xl md:text-3xl text-[#CC5833] italic mb-10"
          style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
        >
          Ni ne devriez-vous.
        </p>

        <a
          href="#pricing"
          className="btn-magnetic inline-flex items-center gap-3 px-10 py-5 bg-[#CC5833] text-[#F2F0E9] text-base font-semibold tracking-tight rounded-full"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <span className="btn-bg-layer bg-[#F2F0E9] rounded-full" />
          <span className="btn-text text-[#F2F0E9] group-hover:text-[#2E4036]">Commander une course</span>
          <svg className="btn-text w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <p
          className="mt-8 text-xs text-[#F2F0E9]/30"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Première course offerte • Sans engagement • Actif à Dakar
        </p>
      </div>
    </section>
  )
}
