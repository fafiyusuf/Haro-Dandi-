"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Star, Globe, Shield, Zap, Users, Gift } from "lucide-react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { t } = useTranslation()
  
  // Modern scroll progress with gradient effect
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001
  })
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const heroImages = [
    {
      url: "images/image2.png",
      alt: "Ethiopian Nature"
    },
    {
      url: "images/image1.png",
      alt: "Ethiopian Landscape"
    },
    {
      url: "images/land.png",
      alt: "Ethiopian Tourism"
    },
    {
      url: "images/image4.png",
      alt: "Ethiopian Heritage"
    },
    {
      url: "images/image5.png",
      alt: "Ethiopian Beauty"
    },
    {
      url: "images/image1.png",
      alt: "Ethiopian Beauty"
    }
  ]

  useEffect(() => {
    if (isHovering) return
    
    // Reduced interval from 5000ms to 3000ms for faster slides
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [heroImages.length, isHovering])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const benefits = [
    {
      icon: <Star className="w-8 h-8" />,
      titleKey: "home.benefits.hotels.title",
      descKey: "home.benefits.hotels.desc",
      gradient: "from-blue-400 to-cyan-300"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titleKey: "home.benefits.globalCommunity.title",
      descKey: "home.benefits.globalCommunity.desc",
      gradient: "from-emerald-400 to-teal-300"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      titleKey: "home.benefits.events.title",
      descKey: "home.benefits.events.desc",
      gradient: "from-amber-400 to-yellow-300"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      titleKey: "home.benefits.inspiration.title",
      descKey: "home.benefits.inspiration.desc",
      gradient: "from-violet-400 to-purple-300"
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: "home.benefits.privileges.title",
      descKey: "home.benefits.privileges.desc",
      gradient: "from-rose-400 to-pink-300"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      titleKey: "home.benefits.deals.title",
      descKey: "home.benefits.deals.desc",
      gradient: "from-orange-400 to-red-300"
    }
  ]

  return (
    <>
      {/* Modern Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75D4D9] via-[#FAC459] to-[#4A7863] origin-left z-50 shadow-lg"
        style={{ scaleX }}
      />
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-300/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section - Modern Carousel */}
        <section 
          className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          ref={carouselRef}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/50 z-0"></div>
          
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Carousel Images with Parallax - FASTER TRANSITIONS */}
          <div className="absolute inset-0 w-full h-full">
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  scale: index === currentSlide ? 1 : 1.1,
                }}
                transition={{
                  duration: 0.8, // Reduced from 1.5 to 0.8 seconds
                  ease: [0.25, 0.1, 0.25, 1] // Faster easing function
                }}
                style={{ y }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 mix-blend-overlay z-10"></div>
          </div>

          {/* Floating Navigation */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
            {heroImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full backdrop-blur-sm border ${
                    index === currentSlide 
                      ? "bg-white border-white" 
                      : "bg-white/30 border-white/50"
                  }`}
                  animate={{
                    scale: index === currentSlide ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5, // Reduced from 2 seconds
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Navigation Arrows - Modern */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-8 z-30 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group/arrow"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover/arrow:border-white/20 transition-all duration-300"></div>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-8 z-30 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group/arrow"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover/arrow:border-white/20 transition-all duration-300"></div>
          </motion.button>

          {/* Hero Content */}
          <motion.div 
            className="relative z-20 text-center text-white max-w-5xl mx-auto px-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} // Faster animation
          >
            {/* Animated Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }} // Faster
            >
            </motion.div>

            <motion.h1 
              className="font-serif text-2xl sm:text-7xl md:text-8xl lg:text-9xl font-light mb-8 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }} // Faster
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              {t("hero.title")}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-light tracking-wide max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }} // Faster
            >
              {t("hero.subtitle")}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} // Faster
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] rounded-full blur opacity-75 group-hover/btn:opacity-100 transition duration-300"></div>
                <Link
                  href="/hotels"
                  className="relative px-12 py-5 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white text-sm tracking-widest uppercase font-semibold rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  {t("hero.cta.lodges")}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="px-12 py-5 border-2 border-white/30 text-white text-sm tracking-widest uppercase font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
                >
                  {t("hero.cta.contact")}
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }} // Faster
            >
              <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Experiences - Modern Grid */}
        <section className="py-32 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="lg:pr-12"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }} // Faster
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-[#75D4D9] to-[#4A7863]"></div>
                  <span className="text-sm font-semibold tracking-wider text-[#75D4D9] uppercase">
                    {t("experience")}
                  </span>
                </div>
                
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight"
                  whileHover={{ color: "#75D4D9" }}
                  transition={{ duration: 0.3 }}
                >
                  {t("home.experience.title")}
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }} // Faster
                  viewport={{ once: true }}
                >
                  {t("home.experience.description")}
                </motion.p>
                
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-[#4A7863] font-semibold group"
                  >
                    <span>{t("Discover More")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }} // Faster
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <motion.img
                    src="images/hos.png"
                    alt="Ethiopian Hospitality"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }} // Faster
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Modern Grid */}
        <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Faster
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-[#FAC459] to-[#4A7863]"></div>
                <span className="text-sm font-semibold tracking-wider text-[#FAC459] uppercase">
                  {t("benefits")}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-[#4A7863] to-[#FAC459]"></div>
              </div>
              
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {t("home.benefits.title")}
              </motion.h2>
              
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }} // Much faster
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                    {/* Icon with Gradient */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }} // Faster
                    >
                      <div className="text-white">
                        {benefit.icon}
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className="text-xl font-bold mb-3 text-gray-900"
                      whileHover={{ color: "#75D4D9" }}
                    >
                      {t(benefit.titleKey)}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(benefit.descKey)}
                    </p>
                    
                    {/* Hover Arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#75D4D9]">
                        <span>{t("learnMore")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Travel Inspiration - Modern Cards */}
        <section className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Faster
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t("home.inspiration.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  image: "images/lali.png",
                  titleKey: "home.inspiration.places.title",
                  descKey: "home.inspiration.places.desc",
                  link: "/tours",
                  badgeKey: "home.inspiration.places.badge"
                },
                {
                  image: "images/hot.png",
                  titleKey: "home.inspiration.luxury.title",
                  descKey: "home.inspiration.luxury.desc",
                  link: "/hotels",
                  badgeKey: "home.inspiration.luxury.badge"
                },
                {
                  image: "images/card2.png",
                  titleKey: "home.inspiration.destinations.title",
                  descKey: "home.inspiration.destinations.desc",
                  link: "/tours",
                  badgeKey: "home.inspiration.luxury.badge"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }} // Faster
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={item.link} className="group block">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 mb-6">
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <motion.img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" // Faster
                        />
                      </div>
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                          {item.badge}
                        </span>
                      </div>
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.h3 
                          className="text-2xl font-bold text-white mb-3"
                          whileHover={{ x: 5 }}
                        >
                          {t(item.titleKey)}
                        </motion.h3>
                        <p className="text-white/90 mb-4">
                          {t(item.descKey)}
                        </p>
                        <div className="inline-flex items-center gap-2 text-white font-semibold">
                          <span>{t("explore")}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }} // Faster
              viewport={{ once: true }}
            >
              <Link
                href="/tours"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#75D4D9] to-[#4A7863] text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 group"
              >
                <span>{t("home.inspiration.readMore")}</span>
                
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Modern Gradient */}
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#75D4D9]  to-[#4A7863]"></div>
          
          {/* Simplified pattern to avoid escape issues */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] opacity-20"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }} // Faster
              viewport={{ once: true }}
            >
              {/* Title */}
              <motion.h2 
                className="text-5xl md:text-7xl font-bold mb-8 text-white"
                whileHover={{ scale: 1.02 }}
              >
                {t("home.cta.title")}
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15 }} // Faster
              >
                {t("home.cta.description")}
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-white text-gray-900 font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>{t("Contact Us")}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }} // Faster
              >
                {[
                  { value: "500+", label: t("happyGuests") },
                  { value: "50+", label: t("destinations") },
                  { value: "24/7", label: t("support") }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/80">{stat.label}</div>
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