"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { apiClient } from "@/services/api"
import type { Hotel } from "@/types/index"
import { useLanguageStore } from "@/stores/useLanguageStore"
import Link from "next/link"

export default function HotelDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await apiClient.getHotelBySlug(slug)
        setHotel(response.data)
      } catch (error) {
        console.error("Error fetching hotel:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHotel()
  }, [slug])

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (!hotel) return <div className="text-center py-12">Hotel not found</div>

  const content = hotel.contents.find((c) => c.language === language) || hotel.contents[0]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Image Carousel */}
        <section className="relative h-96 md:h-[500px] bg-[var(--color-neutral-100)] overflow-hidden">
          {hotel.images[selectedImageIndex] && (
            <img
              src={hotel.images[selectedImageIndex] || "/placeholder.svg"}
              alt={content?.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Image Navigation */}
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              >
                ‹
              </button>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev + 1) % hotel.images.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              >
                ›
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImageIndex ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="font-serif text-4xl font-bold mb-4">{content?.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-[var(--color-neutral-600)]">📍 {hotel.location}</span>
                    {hotel.rating && (
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="text-sm font-semibold">{hotel.rating}/5</span>
                        {hotel.reviews && (
                          <span className="text-xs text-[var(--color-neutral-600)]">({hotel.reviews} reviews)</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose prose-sm max-w-none mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">About This Hotel</h2>
                  <p className="text-[var(--color-neutral-600)] leading-relaxed mb-6">{content?.description}</p>
                </div>

                {content?.amenities && content.amenities.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-6">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {content.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[var(--color-primary)] text-lg">✓</span>
                          <span className="text-[var(--color-neutral-600)]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                  <div className="mb-6">
                    <p className="text-sm text-[var(--color-neutral-600)] mb-2">Price per night</p>
                    <p className="text-4xl font-bold text-[var(--color-primary)]">${hotel.pricePerNight}</p>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full block text-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium mb-3"
                  >
                    Book Now
                  </Link>

                  <button className="w-full px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors font-medium">
                    Contact Us
                  </button>

                  <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
                    <p className="text-sm font-medium">Quick Info</p>
                    <p className="text-xs text-[var(--color-neutral-600)]">📞 +251 XXX XXX XXX</p>
                    <p className="text-xs text-[var(--color-neutral-600)]">📧 info@harodandi.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Hotels */}
        <section className="bg-[var(--color-neutral-50)] py-16">
          <div className="container-custom">
            <h2 className="font-serif text-3xl font-bold mb-8">Other Properties</h2>
            <p className="text-[var(--color-neutral-600)] mb-8">Check out our other hotels and lodges</p>
            <Link
              href="/hotels"
              className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
            >
              View All Hotels
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
