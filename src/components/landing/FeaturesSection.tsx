'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Card 1: Mixeur Diagnostique ─── */
function MixeurCard() {
  const items = [
    { label: 'Tracking GPS', value: 'Temps réel' },
    { label: 'Analytics', value: 'Heatmap Dakar' },
    { label: 'Prédiction IA', value: 'ETA ±3min' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack(prev => {
        const next = [...prev]
        const last = next.pop()!
        next.unshift(last)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-[2rem] bg-[#F2F0E9] border border-[#D4D0C8] p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833]" />
        <span className="text-xs text-[#6B7B71] tracking-tight" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          01 — Analyse en temps réel
        </span>
      </div>
      <h3 className="text-lg text-[#1A1A1A] mb-1" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        Mixeur Diagnostique
      </h3>
      <p className="text-xs text-[#6B7B71] mb-6" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
        Données de livraison cyclées en temps réel
      </p>

      {/* Stacked cards */}
      <div className="relative h-32 flex flex-col justify-center gap-2">
        {stack.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-700"
            style={{
              transform: `translateY(${i * 4}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.3,
              backgroundColor: i === 0 ? '#2E4036' : '#E8E5DC',
              color: i === 0 ? '#F2F0E9' : '#2E4036',
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 3 - i,
            }}
          >
            <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>{item.label}</span>
            <span className="text-xs" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Card 2: Machine à Écrire Télémétrie ─── */
function TypewriterCard() {
  const messages = [
    'Scan colis #DX-7842... OK',
    'Chaîne chiffrement AES-256 active',
    'Route optimisée: Médina → Plateau',
    'Livraison estimée: 14h32 ±2min',
    'Vérification intégrité colis... 100%',
    'Signature biométrique requise',
  ]
  const [currentMsg, setCurrentMsg] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const msg = messages[currentMsg]
    let charIdx = 0
    setDisplayedText('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (charIdx < msg.length) {
        setDisplayedText(msg.slice(0, charIdx + 1))
        charIdx++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentMsg(prev => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentMsg])

  return (
    <div className="rounded-[2rem] bg-[#F2F0E9] border border-[#D4D0C8] p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] pulse-dot" />
        <span className="text-xs text-[#6B7B71] tracking-tight" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          02 — Flux en Direct
        </span>
      </div>
      <h3 className="text-lg text-[#1A1A1A] mb-1" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        Télémétrie Sécurisée
      </h3>
      <p className="text-xs text-[#6B7B71] mb-6" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
        Sécurité de niveau militaire — flux continu
      </p>

      {/* Terminal window */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 min-h-[120px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#CC5833]" />
          <div className="w-2 h-2 rounded-full bg-[#CC5833]/50" />
          <div className="w-2 h-2 rounded-full bg-[#CC5833]/25" />
          <span className="text-[10px] text-[#6B7B71] ml-2" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            secure-feed.dx
          </span>
        </div>
        <p className="text-sm text-[#F2F0E9]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          {displayedText}
          <span className={`cursor-blink text-[#CC5833] ml-0.5`}>▊</span>
        </p>
      </div>
    </div>
  )
}

/* ─── Card 3: Planificateur Protocole Curseur ─── */
function PlannerCard() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const [activeDays, setActiveDays] = useState<number[]>([])
  const [cursorDay, setCursorDay] = useState<number | null>(null)
  const [showSave, setShowSave] = useState(false)
  const [phase, setPhase] = useState<'moving' | 'clicking' | 'saving' | 'done'>('moving')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const sequence = async () => {
      const schedule = [0, 2, 4] // L, M, V

      for (let i = 0; i < schedule.length; i++) {
        const dayIdx = schedule[i]
        setPhase('moving')
        setCursorDay(dayIdx)
        await new Promise(r => setTimeout(r, 600))

        setPhase('clicking')
        await new Promise(r => setTimeout(r, 400))

        setActiveDays(prev => [...prev, dayIdx])
        await new Promise(r => setTimeout(r, 300))
      }

      setCursorDay(null)
      setPhase('saving')
      setShowSave(true)
      await new Promise(r => setTimeout(r, 800))

      setPhase('done')
      setShowSave(false)
    }

    const timer = setTimeout(sequence, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rounded-[2rem] bg-[#F2F0E9] border border-[#D4D0C8] p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833]" />
        <span className="text-xs text-[#6B7B71] tracking-tight" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          03 — Planification
        </span>
      </div>
      <h3 className="text-lg text-[#1A1A1A] mb-1" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        Protocole Curseur
      </h3>
      <p className="text-xs text-[#6B7B71] mb-6" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
        Déploiement en 1 clic — planification auto
      </p>

      {/* Weekly grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              cursorDay === i && phase === 'clicking' ? 'scale-95' : ''
            }`}
          >
            <span className="text-[10px] text-[#6B7B71]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{day}</span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all duration-400 ${
                activeDays.includes(i)
                  ? 'bg-[#CC5833] text-[#F2F0E9]'
                  : cursorDay === i
                  ? 'bg-[#2E4036]/20 border-2 border-[#2E4036]'
                  : 'bg-[#E8E5DC]'
              }`}
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {activeDays.includes(i) ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Cursor indicator */}
      {cursorDay !== null && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 bg-[#2E4036] rounded-full" style={{ boxShadow: '0 0 8px rgba(46,64,54,0.5)' }} />
          <span className="text-[10px] text-[#2E4036]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            Sélection: {days[cursorDay]}
          </span>
        </div>
      )}

      {/* Save button */}
      {showSave && (
        <button
          className="w-full py-2 bg-[#2E4036] text-[#F2F0E9] text-xs rounded-xl transition-all duration-300 hover:bg-[#CC5833]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          ▶ Sauvegarder protocole
        </button>
      )}

      {phase === 'done' && (
        <div className="flex items-center gap-2 text-[#2E4036]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-[10px]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>Protocole déployé — 3 jours actifs</span>
        </div>
      )}
    </div>
  )
}

/* ─── Main Features Section ─── */
export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 sm:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className="text-xs tracking-[0.3em] uppercase text-[#CC5833] mb-4 block"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Fonctionnalités
          </span>
          <h2
            className="text-3xl md:text-5xl text-[#1A1A1A] tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-plus-jakarta)' }}
          >
            Des outils, pas des{' '}
            <span
              className="text-[#CC5833] italic"
              style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
            >
              promesses
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <MixeurCard />
          </div>
          <div className="feature-card">
            <TypewriterCard />
          </div>
          <div className="feature-card">
            <PlannerCard />
          </div>
        </div>
      </div>
    </section>
  )
}
