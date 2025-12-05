"use client"

// import { useAuthStore } from "@/stores/useAuthStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguageStore()
  // const { token, admin, clearAuth } = useAuthStore()
  const { t } = useTranslation()
  const pathname = usePathname()

  const languages = [
    { code: "en", name: "English" },
    { code: "am", name: "አማርኛ" },
    { code: "om", name: "Afaan Oromo" },
  ] as const

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm border-b border-[#E3E9D8] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-2">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-100 h-16">
              <Image 
                src="https://i.imghippo.com/files/mk3387B.jpg" 
                alt="Haro Dandi Hotel & Tourism" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            <Link 
              href="/" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("home")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/about') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("about")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/hotels" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/hotels') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("hotels")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/hotels') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/tours" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/tours') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("tours")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/tours') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/gallery" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/gallery') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("gallery")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/gallery') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative group ${
                isActive('/contact') 
                  ? 'text-[#75D4D9]' 
                  : 'text-[#4A7863] hover:text-[#75D4D9]'
              }`}
            >
              {t("contact")}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#75D4D9] transition-all duration-300 ${
                isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </nav>

          {/* Language & Admin */}
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex gap-1 border border-[#E3E9D8]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                  }}
                  className={`text-[10px] px-3 py-2 tracking-wider font-medium transition-colors ${
                    language === lang.code
                      ? "bg-[#75D4D9] text-white"
                      : "bg-white text-[#4A7863] hover:bg-[#E3E9D8]"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Admin Link or User Menu
            {token && admin && (
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-sm font-medium text-[#4A7863]">{admin.name}</span>
                <Link
                  href="/admin/dashboard"
                  className="text-[10px] tracking-wider uppercase px-4 py-2 bg-[#75D4D9] text-white hover:bg-[#5AB8BD] transition-colors"
                >
                  {t("nav.admin")}
                </Link>
                <button
                  onClick={() => clearAuth()}
                  className="text-[10px] tracking-wider uppercase px-4 py-2 border border-[#E3E9D8] text-[#4A7863] hover:bg-[#E3E9D8] transition-colors"
                >
                  Logout
                </button>
              </div>
            )} */}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-[#4A7863]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden border-t border-[#E3E9D8] py-6 space-y-1 bg-white">
            <Link 
              href="/" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("home")}
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/about') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("about")}
            </Link>
            <Link 
              href="/hotels" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/hotels') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("hotels")}
            </Link>
            <Link 
              href="/tours" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/tours') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("tours")}
            </Link>
            <Link 
              href="/gallery" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/gallery') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("gallery")}
            </Link>
            <Link 
              href="/contact" 
              className={`block px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                isActive('/contact') 
                  ? 'bg-[#75D4D9] text-white' 
                  : 'text-[#4A7863] hover:bg-[#E3E9D8]'
              }`}
            >
              {t("contact")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
