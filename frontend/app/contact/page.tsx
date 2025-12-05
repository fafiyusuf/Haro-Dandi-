"use client"

import type React from "react"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      await apiClient.submitContactForm(formData)
      setSuccess(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920"
              alt="Contact Us"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
            <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 tracking-tight">{t("contact.title")}</h1>
            <p className="text-lg font-light opacity-90">{t("contact.subtitle")}</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h3 className="font-serif text-lg mb-3 text-[#2C2C2C]">📍 {t("contact.address")}</h3>
                  <p className="text-[#666666] font-light">{t("contact.address.value")}</p>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-3 text-[#2C2C2C]">📞 {t("contact.phone")}</h3>
                  <p className="text-[#666666] font-light">
                    <a href="tel:+251" className="hover:text-[#75D4D9] transition-colors">
                      +251 XXX XXX XXX
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-3 text-[#2C2C2C]">📧 {t("contact.email")}</h3>
                  <p className="text-[#666666] font-light">
                    <a href="mailto:info@harodandi.com" className="hover:text-[#75D4D9] transition-colors">
                      info@harodandi.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-3 text-[#2C2C2C]">🕐 {t("contact.hours")}</h3>
                  <p className="text-[#666666] font-light leading-relaxed">
                    {t("contact.hours.weekday")}
                    <br />
                    {t("contact.hours.saturday")}
                    <br />
                    {t("contact.hours.sunday")}
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 bg-[#F8F7F5] p-10">
                <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2C2C2C]">{t("contact.form.title")}</h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-light">
                    {t("contact.form.success")}
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-light">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.firstName")} {t("contact.form.required")}</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                        placeholder={t("contact.form.placeholder.firstName")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.lastName")} {t("contact.form.required")}</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                        placeholder={t("contact.form.placeholder.lastName")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.email")} {t("contact.form.required")}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                        placeholder={t("contact.form.placeholder.email")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.phone")}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                        placeholder={t("contact.form.placeholder.phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.subject")} {t("contact.form.required")}</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                      placeholder={t("contact.form.placeholder.subject")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light mb-2 text-[#666666]">{t("contact.form.message")} {t("contact.form.required")}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#E8DFD0] bg-white focus:outline-none focus:border-[#75D4D9] transition-colors text-[#2C2C2C]"
                      placeholder={t("contact.form.placeholder.message")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-4 bg-[#2C5F5F] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#1F4A4A] transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? t("common.loading") : t("contact.form.submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
