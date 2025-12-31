"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { apiClient } from "@/services/api"
import { useLanguageStore } from "@/stores/useLanguageStore"
import type { Tour } from "@/types/index"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Star,
  ChevronRight,
  Sparkles,
  Compass,
  Mountain,
  Camera,
  Utensils,
  Hotel,
  Loader2,
  Heart,
  TrendingUp,
  Shield
} from "lucide-react"

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "duration">("popular")
  const { language } = useLanguageStore()
  const { t } = useTranslation()

  // Define categories with translation keys
  const tourCategories = [
    { id: "all", label: t("tours.categories.all") || "All Tours", icon: <Compass className="w-4 h-4" /> },
    { id: "cultural", label: t("tours.categories.cultural") || "Cultural", icon: <Camera className="w-4 h-4" /> },
    { id: "adventure", label: t("tours.categories.adventure") || "Adventure", icon: <Mountain className="w-4 h-4" /> },
    { id: "nature", label: t("tours.categories.nature") || "Nature", icon: <Mountain className="w-4 h-4" /> },
    { id: "food", label: t("tours.categories.food") || "Food & Drink", icon: <Utensils className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getTours()
        const toursData = response.data
        setTours(toursData)
        setFilteredTours(toursData)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  useEffect(() => {
    let result = tours.filter(tour => {
      const title = getContentByLanguage(tour.contents, "title").toLowerCase()
      const destination = tour.destination.toLowerCase()
      const description = getContentByLanguage(tour.contents, "description").toLowerCase()
      const category = tour.category || ""
      
      const matchesSearch = searchQuery === "" || 
        title.includes(searchQuery.toLowerCase()) ||
        destination.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.popularity || 0) - (a.popularity || 0)
        case "price-low":
          return (a.pricePerPerson || 0) - (b.pricePerPerson || 0)
        case "price-high":
          return (b.pricePerPerson || 0) - (a.pricePerPerson || 0)
        case "duration":
          return parseInt(b.duration || "0") - parseInt(a.duration || "0")
        default:
          return 0
      }
    })

    setFilteredTours(result)
  }, [tours, searchQuery, selectedCategory, sortBy, language])

  const getContentByLanguage = (contents: any[], field: string) => {
    const content = contents.find((c) => c.language === language)
    return content?.[field] || contents[0]?.[field] || "N/A"
  }

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
              src="images/card2.png"
              alt="Tour Services"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
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
                  delay: i * 0.2,
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
                  {t("tours.title")}
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {t("tours.subtitle")}
              </motion.p>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{tours.length}</div>
                  <div className="text-sm opacity-80">{t("tours.stats.tours")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4.9</div>
                  <div className="text-sm opacity-80">{t("tours.stats.rating")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1000+</div>
                  <div className="text-sm opacity-80">{t("tours.stats.travelers")}</div>
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
                  placeholder={t("tours.searchPlaceholder") || "Search tours by destination, activity, or keyword..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Sort & Filter Controls */}
              
            </div>

            {/* Category Filters */}
            <div className="flex flex-col gap-2 mt-6">
              <span className="text-sm font-medium text-gray-700">{t("tours.categories.title")}</span>
              <div className="flex flex-wrap gap-2">
                {tourCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-600">{t("tours.activeFilter")}:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                  {tourCategories.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")} className="ml-1">×</button>
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 ml-2"
                >
                  {t("tours.clearAll")}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `${t("tours.search")}: "${searchQuery}"` : t("tours.allTours")}
                </h2>
                <p className="text-gray-600">
                  {t("tours.showing", { showing: filteredTours.length, total: tours.length })}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {t("tours.bookNow")} • {t("tours.limitedSpots")}
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-12 h-12 text-amber-500" />
                </motion.div>
                <p className="mt-4 text-gray-600">{t("tours.loading")}</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Compass className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("tours.empty")}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchQuery 
                    ? t("tours.noResults", { query: searchQuery })
                    : t("tours.adjustFilters")
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="mt-6 px-6 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 transition-colors"
                >
                  {t("tours.clearFilters")}
                </button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours.map((tour, index) => (
                    <motion.div
                      key={tour._id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/tours/${tour.slug}`} className="group block">
                        {/* Card Container */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              src={tour.images[0] || "/placeholder.svg"}
                              alt={getContentByLanguage(tour.contents, "title")}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 capitalize">
                                {tour.category || t("tours.categoryDefault")}
                              </span>
                            </div>
                            
                            {/* Save Button */}
                            <button 
                              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Handle save functionality
                              }}
                            >
                              <Heart className="w-5 h-5 text-gray-600" />
                            </button>
                            
                            {/* Popular Badge */}
                            {tour.popularity && tour.popularity > 4 && (
                              <div className="absolute top-4 right-4 group-hover:hidden">
                                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                                  <TrendingUp className="w-3 h-3" />
                                  <span className="text-xs font-bold">{t("tours.popular")}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Price Tag */}
                            <div className="absolute bottom-4 left-4">
                              <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg">
                                <span className="text-xl font-bold">${tour.pricePerPerson}</span>
                                <span className="text-sm opacity-90 ml-1">{t("tours.perPerson")}</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            {/* Tour Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                              {getContentByLanguage(tour.contents, "title")}
                            </h3>
                            
                            {/* Destination */}
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{tour.destination}</span>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                              {getContentByLanguage(tour.contents, "description")}
                            </p>
                            
                            {/* Tour Details */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">{t("tours.duration")}</div>
                                  <div className="font-semibold text-gray-900">{tour.duration} {t("tours.days")}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <Users className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">{t("tours.groupSize")}</div>
                                  <div className="font-semibold text-gray-900">
                                    {tour.groupSize.min}-{tour.groupSize.max} {t("tours.people")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Shield className="w-4 h-4 text-emerald-500" />
                                  <span className="text-xs text-gray-600">{t("tours.guided")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Hotel className="w-4 h-4 text-emerald-500" />
                                  <span className="text-xs text-gray-600">{t("tours.accommodation")}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-amber-600 font-medium group-hover:gap-3 transition-all">
                                <span className="text-sm">{t("tours.viewDetails")}</span>
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

            {/* CTA Banner */}
            {filteredTours.length > 0 && (
              <motion.div 
                className="mt-16 p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t("tours.help.title")}</h3>
                    <p className="opacity-90">{t("tours.help.description")}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {t("tours.help.contact")}
                    </Link>
                    <Link
                      href="/hotels"
                      className="px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                    >
                      {t("tours.help.hotels")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                <span className="text-sm font-semibold tracking-wider text-amber-500 uppercase">
                  {t("tours.why.title")}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t("tours.why.subtitle")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: t("tours.why.features.safe.title"),
                  description: t("tours.why.features.safe.description"),
                  gradient: "from-blue-400 to-cyan-300"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: t("tours.why.features.authentic.title"),
                  description: t("tours.why.features.authentic.description"),
                  gradient: "from-amber-400 to-yellow-300"
                },
                {
                  icon: <Compass className="w-8 h-8" />,
                  title: t("tours.why.features.custom.title"),
                  description: t("tours.why.features.custom.description"),
                  gradient: "from-emerald-400 to-teal-300"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: t("tours.why.features.sustainable.title"),
                  description: t("tours.why.features.sustainable.description"),
                  gradient: "from-rose-400 to-pink-300"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}