"use client"

// import { useAuthStore } from "@/stores/useAuthStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage } = useLanguageStore()
  // const { token, admin, clearAuth } = useAuthStore()
  const { t, i18n } = useTranslation()
  const pathname = usePathname()

  // Sync i18n with the language store
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg py-2' 
        : 'bg-white/90 backdrop-blur-md border-b border-gray-100/50 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-32 h-16 md:w-40 md:h-20 transition-all duration-300 group-hover:scale-105">
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
          <nav className="hidden lg:flex items-center space-x-1">
            {['/', '/about', '/hotels', '/tours', '/gallery', '/contact'].map((path, index) => {
              const labels = ['home', 'about', 'hotels', 'tours', 'gallery', 'contact']
              return (
                <Link 
                  key={path}
                  href={path} 
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-300 relative group ${
                    isActive(path) 
                      ? 'text-[#75D4D9]' 
                      : 'text-gray-700 hover:text-[#75D4D9]'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {t(labels[index])}
                  <span className={`absolute left-4 right-4 bottom-0 h-0.5 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] transform origin-left transition-transform duration-300 ${
                    isActive(path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              )
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-1 bg-gray-50/80 backdrop-blur-sm rounded-full p-1 border border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    i18n.changeLanguage(lang.code)
                  }}
                  className={`text-xs px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    language === lang.code
                      ? "bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Book Now Button */}
            <button className="hidden lg:block px-6 py-3 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5">
              {t("bookNow")}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 rounded-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-100 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-3' : ''
                }`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-3' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl p-6 space-y-1">
            {['/', '/about', '/hotels', '/tours', '/gallery', '/contact'].map((path, index) => {
              const labels = ['home', 'about', 'hotels', 'tours', 'gallery', 'contact']
              return (
                <Link 
                  key={path}
                  href={path} 
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive(path) 
                      ? 'bg-gradient-to-r from-[#75D4D9]/10 to-[#4A7863]/10 text-[#75D4D9] border-l-4 border-[#75D4D9]' 
                      : 'text-gray-700 hover:bg-gray-50 hover:pl-6'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {t(labels[index])}
                </Link>
              )
            })}
            
            {/* Mobile Language Selector */}
            <div className="flex justify-center gap-2 pt-4 mt-4 border-t border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    i18n.changeLanguage(lang.code)
                  }}
                  className={`text-xs px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    language === lang.code
                      ? "bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Mobile Book Now Button */}
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
              {t("bookNow")}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}