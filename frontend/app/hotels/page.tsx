"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import { useLanguageStore } from "@/stores/useLanguageStore"
import type { Hotel } from "@/types/index"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await apiClient.getHotels()
        setHotels(response.data)
      } catch (error) {
        console.error("Error fetching hotels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHotels()
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
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
              alt="Hotels & Lodges"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
            <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 tracking-tight">Hotels & Lodges</h1>
            <p className="text-lg font-light opacity-90">Experience comfort and luxury in stunning locations</p>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            {isLoading ? (
              <div className="text-center py-12 text-[#666666]">Loading hotels...</div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-12 text-[#666666]">
                No hotels available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                  <Link key={hotel._id} href={`/hotels/${hotel.slug}`} className="group">
                    <div className="bg-white overflow-hidden transition-all duration-300">
                      <div className="relative h-[350px] overflow-hidden">
                        {hotel.images[0] && (
                          <img
                            src={hotel.images[0] || "/placeholder.svg"}
                            alt={getContentByLanguage(hotel.contents, "name")}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {hotel.rating && (
                          <div className="absolute top-4 right-4 bg-white text-[#2C2C2C] px-3 py-1 text-sm font-medium">
                            ⭐ {hotel.rating}
                          </div>
                        )}
                      </div>
                      <div className="py-6">
                        <h3 className="font-serif text-2xl font-normal mb-2 text-[#2C2C2C]">
                          {getContentByLanguage(hotel.contents, "name")}
                        </h3>
                        <p className="text-sm text-[#666666] mb-3 font-light">📍 {hotel.location}</p>
                        <p className="text-sm text-[#666666] mb-6 line-clamp-2 font-light leading-relaxed">
                          {getContentByLanguage(hotel.contents, "description")}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-light text-[#2C2C2C]">
                            ${hotel.pricePerNight}
                            <span className="text-sm text-[#666666]">/night</span>
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

        {/* Call to Action */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-[1000px] mx-auto px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C]">Ready to Book Your Stay?</h2>
            <p className="text-lg text-[#666666] font-light mb-8">Contact us today for reservations and special packages</p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#2C5F5F] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#1F4A4A] transition-all duration-300 rounded-full"
            >
              Get In Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
