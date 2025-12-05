"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import type { GalleryImage } from "@/types/index"
import { useEffect, useState } from "react"

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "hotel" | "tour" | "experience" | "other">("all")

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiClient.getGalleryImages()
        setImages(response.data.sort((a: any, b: any) => a.order - b.order))
      } catch (error) {
        console.error("Error fetching gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  const filteredImages = filter === "all" ? images : images.filter((img) => img.category === filter)

  return (
    <>
      <Header />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
          <div className="absolute inset-0">
            <img
              src="https://i.imghippo.com/files/ncE2657spM.webp"
              alt="Gallery"
              className="w-full h-full object-cover opacity-100"
            />
          </div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
            <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 tracking-tight">Gallery</h1>
            <p className="text-lg font-light opacity-90">Explore the beauty of Haro Dandi</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {["all", "hotel", "tour", "experience", "other"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-6 py-2 text-xs tracking-widest uppercase font-medium transition-colors ${
                    filter === cat
                      ? "bg-[#2C2C2C] text-white"
                      : "bg-white border border-[#E8DFD0] text-[#666666] hover:bg-[#F8F7F5]"
                  }`}
                >
                  {cat === "all" ? "All Images" : cat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-[#666666]">Loading gallery...</div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12 text-[#666666]">No images in this category yet.</div>
            ) : (
              <>
                {/* Main Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {filteredImages.map((image) => (
                    <div
                      key={image._id}
                      onClick={() => setSelectedImage(image)}
                      className="relative group cursor-pointer overflow-hidden aspect-square"
                    >
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-start p-4">
                        <p className="text-white font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white max-w-5xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-[#E8DFD0]">
                <h3 className="font-serif text-xl text-[#2C2C2C]">{selectedImage.title}</h3>
                <button onClick={() => setSelectedImage(null)} className="text-2xl text-[#666666] hover:text-[#2C2C2C]">
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-black">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {selectedImage.description && (
                <div className="p-6 bg-[#F8F7F5]">
                  <p className="text-[#666666] font-light">{selectedImage.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
