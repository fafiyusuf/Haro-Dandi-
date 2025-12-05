"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1C3D3D] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl mb-6 tracking-tight">{t("footer.company")}</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0">
                <svg className="w-5 h-5 text-[#1C3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-[#1C3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-[#1C3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-[#1C3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-[#1C3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">{t("footer.contactUs")}</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  {t("footer.faqs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">{t("footer.partnerships")}</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  {t("footer.corporate")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  {t("footer.foundation")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  {t("footer.careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">{t("footer.cookies")}</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">{t("footer.newsletter")}</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t("footer.email.placeholder")}
                className="flex-1 px-4 py-2 text-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
              />
              <button className="px-6 py-2 bg-[#D2691E] text-white text-sm font-medium hover:bg-[#B85A19] transition-colors uppercase tracking-wider whitespace-nowrap">
                {t("footer.subscribe")}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 font-light">
              * Subscribe to receive daily travel inspiration from around the world
            </p>
          </div>
        </div>

        <div className="border-t border-[#2D5555] pt-6 text-center">
          <p className="text-xs text-gray-400 font-light">
            Copyright © 2004 - {currentYear} HARO DANDI AG
          </p>
        </div>
      </div>
    </footer>
  )
}
