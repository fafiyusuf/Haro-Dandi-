"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import { useLanguageStore } from "@/stores/useLanguageStore"
import type { Tour } from "@/types/index"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await apiClient.getTours()
        setTours(response.data)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  const getContentByLanguage = (contents: any[], field: string) => {
    const content = contents.find((c) => c.language === language)
    return content?.[field] || contents[0]?.[field] || "N/A"
  }

  return (
    <>
      <Header />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
          <div className="absolute inset-0">
            <img
              src="https://i.imghippo.com/files/XyPN5353Wg.jpg"
              alt="Tour Services"
              className="w-full h-full object-cover opacity-100"
            />
          </div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
            <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 tracking-tight">Tour Services</h1>
            <p className="text-lg font-light opacity-90">Discover unforgettable travel experiences across Ethiopia</p>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            {isLoading ? (
              <div className="text-center py-12 text-[#666666]">Loading tours...</div>
            ) : tours.length === 0 ? (
              <div className="text-center py-12 text-[#666666]">No tours available at the moment.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <Link key={tour._id} href={`/tours/${tour.slug}`} className="group">
                    <div className="bg-white overflow-hidden transition-all duration-300">
                      <div className="relative h-[350px] overflow-hidden">
                        {tour.images[0] && (
                          <img
                            src={tour.images[0] || "/placeholder.svg"}
                            alt={getContentByLanguage(tour.contents, "title")}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-sm font-light mb-1">📍 {tour.destination}</p>
                        </div>
                      </div>
                      <div className="py-6">
                        <h3 className="font-serif text-2xl font-normal mb-3 text-[#2C2C2C]">
                          {getContentByLanguage(tour.contents, "title")}
                        </h3>
                        <p className="text-sm text-[#666666] mb-4 line-clamp-2 font-light leading-relaxed">
                          {getContentByLanguage(tour.contents, "description")}
                        </p>
                        <div className="flex items-center justify-between mb-4 text-sm text-[#666666]">
                          <span className="flex items-center gap-1 font-light">⏱️ {tour.duration} days</span>
                          <span className="flex items-center gap-1 font-light">
                            👥 {tour.groupSize.min}-{tour.groupSize.max} people
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-light text-[#2C2C2C]">
                            ${tour.pricePerPerson}
                            <span className="text-sm text-[#666666]">/person</span>
                          </span>
                          <span className="text-xs tracking-widest uppercase text-[#75D4D9] font-medium group-hover:text-[#5AB8BD]">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
