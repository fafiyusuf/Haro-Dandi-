"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import type { GalleryImage } from "@/types/index"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Filter, 
  Search, 
  Grid3x3, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Share2,
  Loader2
} from "lucide-react"

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "hotel" | "tour" | "experience" | "other">("all")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getGalleryImages()
        const sortedImages = response.data.sort((a: any, b: any) => a.order - b.order)
        setImages(sortedImages)
      } catch (error) {
        console.error("Error fetching gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  const filteredImages = filter === "all" 
    ? images 
    : images.filter((img) => img.category === filter)

  const searchedImages = searchQuery
    ? filteredImages.filter(img => 
        img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredImages

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const handleNextImage = () => {
    const nextIndex = (selectedIndex + 1) % searchedImages.length
    setSelectedImage(searchedImages[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const handlePrevImage = () => {
    const prevIndex = (selectedIndex - 1 + searchedImages.length) % searchedImages.length
    setSelectedImage(searchedImages[prevIndex])
    setSelectedIndex(prevIndex)
  }

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: image.url
        })
      } catch (error) {
        console.log('Sharing cancelled')
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(image.url)
      alert(t("gallery.shareCopied") || "Image URL copied to clipboard!")
    }
  }

  const categories = [
    { key: "all", label: t("gallery.categories.all") || "All Images", count: images.length },
    { key: "hotel", label: t("gallery.categories.hotel") || "Hotels", count: images.filter(img => img.category === "hotel").length },
    { key: "tour", label: t("gallery.categories.tour") || "Tours", count: images.filter(img => img.category === "tour").length },
    { key: "experience", label: t("gallery.categories.experience") || "Experiences", count: images.filter(img => img.category === "experience").length },
    { key: "other", label: t("gallery.categories.other") || "Other", count: images.filter(img => img.category === "other").length },
  ]

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Modern */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-emerald-900/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.img
              src="images/tour.png"
              alt="Gallery"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 30, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="font-serif text-5xl sm:text-7xl md:text-8xl font-light mb-6 leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white via-amber-100 to-emerald-100 bg-clip-text text-transparent">
                  {t("gallery.title")}
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {t("gallery.subtitle")}
              </motion.p>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{images.length}</div>
                  <div className="text-sm opacity-80">{t("gallery.stats.images")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{categories.length}</div>
                  <div className="text-sm opacity-80">{t("gallery.stats.categories")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{t("gallery.stats.quality")}</div>
                  <div className="text-sm opacity-80">{t("gallery.stats.qualityLabel")}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Controls */}
        <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("gallery.searchPlaceholder") || "Search images..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span className="text-sm font-medium">{t("gallery.filter")}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => setFilter(cat.key as any)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${
                            filter === cat.key
                              ? "bg-emerald-50 text-emerald-700"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat.key
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    filter === cat.key ? "bg-white/20" : "bg-gray-200"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <p className="mt-4 text-gray-600">{t("gallery.loading")}</p>
              </div>
            ) : searchedImages.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("gallery.empty")}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchQuery 
                    ? t("gallery.noSearchResults", { query: searchQuery, category: filter })
                    : t("gallery.noCategoryResults", { category: filter })
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Info Bar */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery 
                        ? t("gallery.searchResults", { query: searchQuery })
                        : t("gallery.categoryResults", { category: filter.charAt(0).toUpperCase() + filter.slice(1) })
                      }
                    </h2>
                    <p className="text-gray-600">
                      {t("gallery.showingResults", { showing: searchedImages.length, total: images.length })}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("gallery.instructions")}
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className={`gap-4 ${
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
                }`}>
                  <AnimatePresence>
                    {searchedImages.map((image, index) => (
                      <motion.div
                        key={image._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 break-inside-avoid group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleImageClick(image, index)}
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden">
                          <motion.img
                            src={image.url || "/placeholder.svg"}
                            alt={image.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                              {image.category}
                            </span>
                          </div>
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-3">
                              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                                <Maximize2 className="w-5 h-5 text-gray-900" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Image Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {image.title}
                          </h3>
                          {image.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
                    {selectedImage.category && (
                      <span className="inline-block px-3 py-1 mt-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {selectedImage.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare(selectedImage)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={t("gallery.share") || "Share"}
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDownload(selectedImage.url, selectedImage.title)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={t("gallery.download") || "Download"}
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={t("gallery.close") || "Close"}
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative aspect-video bg-black">
                  <motion.img
                    key={selectedImage._id}
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Navigation Buttons */}
                  {searchedImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrevImage()
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-all shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNextImage()
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-all shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm">
                      {t("gallery.imageCounter", { current: selectedIndex + 1, total: searchedImages.length })}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {selectedImage.description && (
                  <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-3xl mx-auto">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        {t("gallery.description")}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}