'use client'

export default function FooterSection() {
  const navColumns = [
    {
      title: 'Produit',
      links: ['Fonctionnalités', 'Tarifs', 'API', 'Intégrations'],
    },
    {
      title: 'Entreprise',
      links: ['À propos', 'Carrières', 'Blog', 'Presse'],
    },
    {
      title: 'Support',
      links: ['Centre d\'aide', 'Contact', 'Statut', 'Documentation'],
    },
  ]

  return (
    <footer className="relative w-full bg-[#1A1A1A] rounded-t-[4rem] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <h3
              className="text-xl font-bold text-[#F2F0E9] tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              DiayXpress
            </h3>
            <p className="text-[#F2F0E9]/40 text-sm mb-6 max-w-xs">
              Livraison rapide de colis en 2 heures à Dakar. Précision du dernier kilomètre.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 status-dot" />
              <span
                className="text-xs text-[#F2F0E9]/40"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Système Opérationnel
              </span>
            </div>
          </div>

          {/* Navigation columns */}
          {navColumns.map((col, i) => (
            <div key={i}>
              <h4
                className="text-xs text-[#F2F0E9]/60 tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-[#F2F0E9]/30 hover:text-[#CC5833] transition-colors duration-300 lift-hover inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F2F0E9]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#F2F0E9]/20"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            © 2025 DiayXpress. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#F2F0E9]/20 hover:text-[#F2F0E9]/40 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[#F2F0E9]/20 hover:text-[#F2F0E9]/40 transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-xs text-[#F2F0E9]/20 hover:text-[#F2F0E9]/40 transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
