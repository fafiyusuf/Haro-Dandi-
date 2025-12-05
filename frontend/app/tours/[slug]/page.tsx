"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { apiClient } from "@/services/api"
import type { Tour } from "@/types/index"
import { useLanguageStore } from "@/stores/useLanguageStore"
import Link from "next/link"

export default function TourDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await apiClient.getTourBySlug(slug)
        setTour(response.data)
      } catch (error) {
        console.error("Error fetching tour:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTour()
  }, [slug])

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (!tour) return <div className="text-center py-12">Tour not found</div>

  const content = tour.contents.find((c) => c.language === language) || tour.contents[0]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Image Carousel */}
        <section className="relative h-96 md:h-[500px] bg-[var(--color-neutral-100)] overflow-hidden">
          {tour.images[selectedImageIndex] && (
            <img
              src={tour.images[selectedImageIndex] || "/placeholder.svg"}
              alt={content?.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Image Navigation */}
          {tour.images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              >
                ‹
              </button>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev + 1) % tour.images.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              >
                ›
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {tour.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImageIndex ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="font-serif text-4xl font-bold">{content?.title}</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="flex items-center gap-2 text-lg font-semibold">📍 {tour.destination}</span>
                    <span className="flex items-center gap-2 text-lg font-semibold">⏱️ {tour.duration} Days</span>
                    <span className="flex items-center gap-2 text-lg font-semibold">
                      👥 {tour.groupSize.min}-{tour.groupSize.max} People
                    </span>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-[var(--color-neutral-600)] leading-relaxed mb-6">{content?.description}</p>
                </div>

                {content?.itinerary && content.itinerary.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-6">Itinerary</h2>
                    <div className="space-y-4">
                      {content.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[var(--color-primary)] text-white font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-[var(--color-neutral-600)]">{day}</p>
                          </div>
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
                    <p className="text-sm text-[var(--color-neutral-600)] mb-2">Price per person</p>
                    <p className="text-4xl font-bold text-[var(--color-accent)]">${tour.pricePerPerson}</p>
                    <p className="text-xs text-[var(--color-neutral-500)] mt-2">for {tour.duration} days</p>
                  </div>

                  <div className="bg-[var(--color-neutral-50)] rounded p-4 mb-6">
                    <p className="text-sm font-medium mb-2">Tour Details</p>
                    <ul className="space-y-1 text-xs text-[var(--color-neutral-600)]">
                      <li>Duration: {tour.duration} days</li>
                      <li>
                        Group size: {tour.groupSize.min}-{tour.groupSize.max} people
                      </li>
                      <li>Destination: {tour.destination}</li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full block text-center px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-dark)] transition-colors font-medium mb-3"
                  >
                    Book This Tour
                  </Link>

                  <button className="w-full px-6 py-3 border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent)] hover:text-white transition-colors font-medium">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
