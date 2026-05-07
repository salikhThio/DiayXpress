'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Philosophie', href: '#philosophy' },
  { label: 'Protocole', href: '#protocol' },
  { label: 'Tarifs', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on link click
  const handleLinkClick = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? 'bg-[#F2F0E9]/70 backdrop-blur-xl border border-[#D4D0C8]/50 shadow-lg shadow-[#2E4036]/5'
            : 'bg-transparent border border-transparent'
        } rounded-full px-2 py-2 flex items-center gap-1`}
      >
        {/* Logo */}
        <a
          href="#"
          className={`px-4 py-2 font-bold text-sm tracking-tight transition-colors duration-500 lift-hover ${
            scrolled ? 'text-[#2E4036]' : 'text-[#F2F0E9]'
          }`}
          style={{ fontFamily: 'var(--font-plus-jakarta)' }}
        >
          DiayXpress
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-xs tracking-tight rounded-full transition-colors duration-500 lift-hover ${
                scrolled
                  ? 'text-[#2E4036]/60 hover:text-[#2E4036] hover:bg-[#2E4036]/5'
                  : 'text-[#F2F0E9]/60 hover:text-[#F2F0E9] hover:bg-[#F2F0E9]/10'
              }`}
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#pricing"
          className="btn-magnetic hidden sm:inline-flex ml-2 px-5 py-2 bg-[#CC5833] text-[#F2F0E9] text-xs font-semibold tracking-tight rounded-full"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <span className="btn-bg-layer bg-[#2E4036] rounded-full" />
          <span className="btn-text">Commander</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ml-2 p-2 rounded-full transition-colors ${
            scrolled ? 'text-[#2E4036]' : 'text-[#F2F0E9]'
          }`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-[#F2F0E9] text-2xl font-medium tracking-tight lift-hover"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={handleLinkClick}
            className="btn-magnetic mt-4 px-8 py-4 bg-[#CC5833] text-[#F2F0E9] text-base font-semibold tracking-tight rounded-full"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span className="btn-bg-layer bg-[#2E4036] rounded-full" />
            <span className="btn-text">Commander une course</span>
          </a>
        </div>
      </div>
    </>
  )
}
