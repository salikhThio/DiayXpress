'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── SVG Animations ─── */

function GeometricPattern() {
  const groupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (groupRef.current) {
        gsap.to(groupRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
          svgOrigin: '100 100',
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <g ref={groupRef}>
        {/* Double helix */}
        <path
          d="M100,10 C130,40 70,60 100,100 C130,140 70,160 100,190"
          fill="none"
          stroke="#CC5833"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M100,10 C70,40 130,60 100,100 C70,140 130,160 100,190"
          fill="none"
          stroke="#F2F0E9"
          strokeWidth="1.5"
          opacity="0.3"
        />
        {/* Cross links */}
        {[30, 55, 80, 100, 125, 150, 175].map((y, i) => (
          <line
            key={i}
            x1={70 + 30 * Math.sin(y * 0.05)}
            y1={y}
            x2={130 - 30 * Math.sin(y * 0.05)}
            y2={y}
            stroke="#CC5833"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
      </g>
    </svg>
  )
}

function GridScanLine() {
  const lineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { attr: { y1: 0, y2: 0 } },
          {
            attr: { y1: 200, y2: 200 },
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      {/* Grid of dots */}
      {Array.from({ length: 64 }, (_, i) => {
        const x = (i % 8) * 25 + 12
        const y = Math.floor(i / 8) * 25 + 12
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="#CC5833"
            opacity={0.3}
          />
        )
      })}
      {/* Scan line */}
      <line
        ref={lineRef}
        x1="0"
        y1="0"
        x2="200"
        y2="0"
        stroke="#CC5833"
        strokeWidth="2"
        opacity="0.8"
      />
    </svg>
  )
}

function ECGWaveform() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(pathRef.current, {
          strokeDashoffset: -length,
          duration: 4,
          ease: 'none',
          repeat: -1,
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 200 100" className="w-full h-1/2 opacity-20" xmlns="http://www.w3.org/2000/svg">
      <path
        ref={pathRef}
        d="M0,50 L30,50 L40,50 L45,20 L50,80 L55,35 L60,50 L80,50 L90,50 L95,25 L100,75 L105,30 L110,50 L140,50 L150,50 L155,15 L160,85 L165,40 L170,50 L200,50"
        fill="none"
        stroke="#CC5833"
        strokeWidth="2"
      />
    </svg>
  )
}

/* ─── Protocol Card Data ─── */
const protocolSteps = [
  {
    number: '01',
    title: 'Capture',
    description: 'Analyse instantanée de la demande et géolocalisation précise du point de départ à Dakar.',
    pattern: <GeometricPattern />,
  },
  {
    number: '02',
    title: 'Routage',
    description: 'Optimisation algorithmique du parcours en temps réel, contournement des congestions urbaines.',
    pattern: <GridScanLine />,
  },
  {
    number: '03',
    title: 'Livraison',
    description: 'Exécution chirurgicale en 2 heures. Confirmation biométrique et traçabilité complète.',
    pattern: <ECGWaveform />,
  },
]

/* ─── Main Protocol Section ─── */
export default function ProtocolSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card')

      // Desktop: stacked sticky behavior
      if (window.innerWidth >= 768) {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 10%',
            end: 'bottom 10%',
            pin: true,
            pinSpacing: false,
          })

          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 0.92,
              filter: 'blur(20px)',
              opacity: 0.5,
              scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top 90%',
                end: 'top 10%',
                scrub: 1,
              },
            })
          }
        })
      } else {
        // Mobile: simple fade-in
        gsap.from('.protocol-card', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative w-full bg-[#F2F0E9]"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 md:pt-32 pb-8">
        <span
          className="text-xs tracking-[0.3em] uppercase text-[#CC5833] mb-4 block"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Protocole
        </span>
        <h2
          className="text-3xl md:text-5xl text-[#1A1A1A] tracking-tight leading-[1.1]"
          style={{ fontFamily: 'var(--font-plus-jakarta)' }}
        >
          Notre méthode,{' '}
          <span
            className="text-[#CC5833] italic"
            style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
          >
            étape par étape
          </span>
        </h2>
      </div>

      {/* Stacked Cards */}
      <div className="pb-8 md:pb-32">
        {protocolSteps.map((step, i) => (
          <div
            key={i}
            className="protocol-card min-h-[70vh] md:min-h-screen flex items-center justify-center px-6 sm:px-10 py-8"
          >
            <div className="w-full max-w-5xl rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* SVG Animation */}
                <div className="aspect-square md:aspect-auto md:min-h-[400px] flex items-center justify-center p-8 relative">
                  {step.pattern}
                  {/* Step number overlay */}
                  <span
                    className="absolute top-6 left-6 md:top-8 md:left-8 text-6xl md:text-8xl font-bold text-[#F2F0E9]/[0.03]"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-12 flex flex-col justify-center">
                  <span
                    className="text-xs text-[#CC5833] tracking-[0.3em] uppercase mb-4"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    Étape {step.number}
                  </span>
                  <h3
                    className="text-2xl md:text-4xl text-[#F2F0E9] tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#F2F0E9]/50 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-6 md:mt-8 w-12 h-[2px] bg-[#CC5833]/40" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
