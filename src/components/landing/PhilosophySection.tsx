'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each word in the philosophy text
      const words = sectionRef.current?.querySelectorAll('.philosophy-word')
      if (words) {
        gsap.from(words, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Animate the contrast statement
      gsap.from('.philosophy-contrast', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.philosophy-contrast',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Parallax on background image
      gsap.to('.philosophy-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const commonWords = ['vitesse', 'sans', 'fiabilité']
  const differentWords = ['la', 'précision', 'du', 'dernier', 'kilomètre']

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full py-32 md:py-44 overflow-hidden bg-[#1A1A1A]"
    >
      {/* Parallax background texture */}
      <div
        className="philosophy-bg absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80&auto=format')`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-[#1A1A1A]/80" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        {/* Common approach */}
        <p className="text-[#F2F0E9]/40 text-lg md:text-xl mb-8 leading-relaxed">
          {'La plupart des services de livraison se concentrent sur :'.split(' ').map((word, i) => (
            <span key={i} className="philosophy-word inline-block mr-[0.3em]">{word}</span>
          ))}
        </p>
        <p className="text-[#F2F0E9]/60 text-2xl md:text-3xl mb-16 leading-relaxed">
          {commonWords.map((word, i) => (
            <span key={i} className="philosophy-word inline-block mr-[0.3em]">{word}</span>
          ))}
        </p>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-[#CC5833]/40 mb-16" />

        {/* Differentiated approach */}
        <div className="philosophy-contrast">
          <p className="text-[#F2F0E9]/40 text-lg md:text-xl mb-4">
            Nous nous concentrons sur :
          </p>
          <p
            className="text-4xl sm:text-5xl md:text-7xl text-[#F2F0E9] italic leading-[1.1]"
            style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
          >
            {differentWords.map((word, i) => (
              <span
                key={i}
                className={`inline-block mr-[0.2em] ${word === 'précision' ? 'text-[#CC5833] not-italic font-bold' : ''}`}
                style={word === 'précision' ? { fontFamily: 'var(--font-plus-jakarta)' } : {}}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Sub-text */}
        <p
          className="mt-12 text-[#F2F0E9]/25 text-xs max-w-md"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Chaque colis mérite un parcours calculé au mètre près.
          Notre obsession : zéro erreur, zéro retard.
        </p>
      </div>
    </section>
  )
}
