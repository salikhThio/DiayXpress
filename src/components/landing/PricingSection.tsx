'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  {
    name: 'Essentiel',
    price: '2 500',
    unit: 'FCFA/course',
    description: 'Pour les envois ponctuels et réguliers dans Dakar.',
    features: [
      'Livraison en 4h garantie',
      'Tracking GPS basique',
      'Assurance colis standard',
      'Support par chat',
    ],
    highlighted: false,
  },
  {
    name: 'Performance',
    price: '4 500',
    unit: 'FCFA/course',
    description: 'Livraison express en 2h. Notre signature.',
    features: [
      'Livraison en 2h garantie',
      'Tracking GPS temps réel',
      'Assurance colis premium',
      'Route optimisée par IA',
      'Support prioritaire 24/7',
    ],
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur mesure',
    unit: '',
    description: 'Solutions dédiées pour les volumes élevés.',
    features: [
      'Volume illimité',
      'API d\'intégration',
      'Dashboard analytique',
      'Manager dédié',
      'SLA personnalisé',
    ],
    highlighted: false,
  },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
      id="pricing"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 sm:px-10 bg-[#F2F0E9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span
            className="text-xs tracking-[0.3em] uppercase text-[#CC5833] mb-4 block"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Tarifs
          </span>
          <h2
            className="text-3xl md:text-5xl text-[#1A1A1A] tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-plus-jakarta)' }}
          >
            Un prix juste pour un{' '}
            <span
              className="text-[#CC5833] italic"
              style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
            >
              service exact
            </span>
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card rounded-[2rem] p-8 transition-all duration-500 ${
                tier.highlighted
                  ? 'bg-[#2E4036] text-[#F2F0E9] ring-2 ring-[#CC5833] md:scale-105 md:-my-4 shadow-2xl'
                  : 'bg-[#F2F0E9] border border-[#D4D0C8] shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Tier name */}
              <span
                className={`text-xs tracking-[0.2em] uppercase ${
                  tier.highlighted ? 'text-[#CC5833]' : 'text-[#6B7B71]'
                }`}
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {tier.name}
              </span>

              {/* Price */}
              <div className="mt-4 mb-2">
                <span
                  className={`text-4xl md:text-5xl font-bold ${
                    tier.highlighted ? 'text-[#F2F0E9]' : 'text-[#1A1A1A]'
                  }`}
                  style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                >
                  {tier.price}
                </span>
                {tier.unit && (
                  <span
                    className={`text-sm ml-2 ${
                      tier.highlighted ? 'text-[#F2F0E9]/50' : 'text-[#6B7B71]'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {tier.unit}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-sm mt-2 mb-6 ${
                  tier.highlighted ? 'text-[#F2F0E9]/60' : 'text-[#6B7B71]'
                }`}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={tier.highlighted ? '#CC5833' : '#2E4036'}
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span
                      className={`text-sm ${
                        tier.highlighted ? 'text-[#F2F0E9]/80' : 'text-[#1A1A1A]/70'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`btn-magnetic inline-flex items-center justify-center w-full py-3 text-sm font-semibold tracking-tight rounded-xl transition-all ${
                  tier.highlighted
                    ? 'bg-[#CC5833] text-[#F2F0E9]'
                    : 'bg-[#2E4036] text-[#F2F0E9]'
                }`}
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                <span className={`btn-bg-layer rounded-xl ${tier.highlighted ? 'bg-[#F2F0E9]' : 'bg-[#CC5833]'}`} />
                <span className="btn-text">
                  {tier.name === 'Entreprise' ? 'Nous contacter' : 'Commander une course'}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
