"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import { useLanguageStore } from "@/stores/useLanguageStore"
import type { Hotel } from "@/types/index"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ChevronRight, 
  Calendar,
  Shield,
  Heart,
  Loader2
} from "lucide-react"

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high" | "name">("rating")
  const { language } = useLanguageStore()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getHotels()
        const hotelsData = response.data
        setHotels(hotelsData)
        setFilteredHotels(hotelsData)
      } catch (error) {
        console.error("Error fetching hotels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHotels()
  }, [])

  useEffect(() => {
    let result = hotels.filter(hotel => {
      const name = getContentByLanguage(hotel.contents, "name").toLowerCase()
      const location = hotel.location.toLowerCase()
      const description = getContentByLanguage(hotel.contents, "description").toLowerCase()
      
      const matchesSearch = searchQuery === "" || 
        name.includes(searchQuery.toLowerCase()) ||
        location.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase())
      
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.every(filter => hotel.amenities?.includes(filter))
      
      return matchesSearch && matchesFilters
    })

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "price-low":
          return (a.pricePerNight || 0) - (b.pricePerNight || 0)
        case "price-high":
          return (b.pricePerNight || 0) - (a.pricePerNight || 0)
        case "name":
          return getContentByLanguage(a.contents, "name").localeCompare(getContentByLanguage(b.contents, "name"))
        default:
          return 0
      }
    })

    setFilteredHotels(result)
  }, [hotels, searchQuery, selectedFilters, sortBy, language])

  const getContentByLanguage = (contents: any[], field: string) => {
    const content = contents.find((c) => c.language === language)
    return content?.[field] || contents[0]?.[field] || "N/A"
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filters = ["wifi", "pool", "spa", "restaurant", "gym", "parking", "breakfast", "airport-shuttle"]

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Modern */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-teal-900/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
              alt="Hotels & Lodges"
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
                <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-100 bg-clip-text text-transparent">
                  {t("hotels.title")}
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {t("hotels.subtitle")}
              </motion.p>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{hotels.length}</div>
                  <div className="text-sm opacity-80">{t("hotels.stats.premium")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">5</div>
                  <div className="text-sm opacity-80">{t("hotels.stats.rating")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-80">{t("hotels.stats.support")}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("hotels.searchPlaceholder") || "Search hotels by name, location, or amenities..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Sort & Filter Controls */}
              <div className="flex items-center gap-4">
                {/* Filter Button */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span className="text-sm font-medium">{t("hotels.filter")}</span>
                    {selectedFilters.length > 0 && (
                      <span className="w-6 h-6 bg-teal-500 text-white text-xs rounded-full flex items-center justify-center">
                        {selectedFilters.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFilters.includes(filter)
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className="capitalize">{t(`hotels.filters.${filter}`) || filter.replace("-", " ")}</span>
                </button>
              ))}
              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {t("hotels.clearAll")}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? t("hotels.searchResults", { query: searchQuery }) : t("hotels.allHotels")}
                </h2>
                <p className="text-gray-600">
                  {t("hotels.showingResults", { showing: filteredHotels.length, total: hotels.length })}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {t("hotels.instructions")}
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-12 h-12 text-teal-500" />
                </motion.div>
                <p className="mt-4 text-gray-600">{t("hotels.loading")}</p>
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("hotels.empty")}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchQuery 
                    ? t("hotels.noSearchResults", { query: searchQuery })
                    : t("hotels.adjustFilters")
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedFilters([])
                  }}
                  className="mt-6 px-6 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors"
                >
                  {t("hotels.clearFilters")}
                </button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((hotel, index) => (
                    <motion.div
                      key={hotel._id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/hotels/${hotel.slug}`} className="group block">
                        {/* Card Container */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              src={hotel.images[0] || "/placeholder.svg"}
                              alt={getContentByLanguage(hotel.contents, "name")}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            {/* Rating Badge */}
                            {hotel.rating && (
                              <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                                  <span className="text-sm font-bold text-gray-900">{hotel.rating}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Save Button */}
                            <button 
                              className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Handle save functionality
                              }}
                            >
                              <Heart className="w-5 h-5 text-gray-600" />
                            </button>
                            
                            {/* Price Tag */}
                            <div className="absolute bottom-4 left-4">
                              <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-lg">
                                <span className="text-xl font-bold">${hotel.pricePerNight}</span>
                                <span className="text-sm opacity-90 ml-1">{t("hotels.perNight")}</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            {/* Hotel Name */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                              {getContentByLanguage(hotel.contents, "name")}
                            </h3>
                            
                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                              {getContentByLanguage(hotel.contents, "description")}
                            </p>
                            
                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {hotel.amenities?.slice(0, 4).map((amenity, i) => (
                                <span 
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {hotel.amenities && hotel.amenities.length > 4 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{hotel.amenities.length - 4} {t("hotels.more")}
                                </span>
                              )}
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Shield className="w-4 h-4 text-teal-500" />
                                  <span className="text-xs text-gray-600">{t("hotels.secure")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4 text-teal-500" />
                                  <span className="text-xs text-gray-600">{t("hotels.flexible")}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all">
                                <span className="text-sm">{t("hotels.viewDetails")}</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* Load More / Pagination */}
            {filteredHotels.length > 0 && filteredHotels.length < hotels.length && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-medium rounded-full hover:bg-teal-50 transition-colors">
                  {t("hotels.loadMore")}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action - Modern */}
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-400"></div>
          
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full mb-8">
                <span className="text-white font-semibold">{t("hotels.cta.ready")}</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                {t("hotels.cta.title")}
              </h2>
              
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("hotels.cta.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>{t("hotels.cta.button")}</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300 group"
                >
                  <span>{t("hotels.cta.exploreTours")}</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <motion.div 
                className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { value: t("hotels.trust.bestPrice"), label: t("hotels.trust.guarantee") },
                  { value: t("hotels.trust.support"), label: t("hotels.trust.supportLabel") },
                  { value: t("hotels.trust.secure"), label: t("hotels.trust.booking") }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{item.value}</div>
                    <div className="text-white/80">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}