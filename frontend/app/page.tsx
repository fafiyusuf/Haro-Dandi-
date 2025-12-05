"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion, useScroll, useSpring } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001
  })

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
      url: "https://i.imghippo.com/files/gcJs1275qCk.jpg",
      alt: "Ethiopian Nature"
    },
    {
      url: "https://i.imghippo.com/files/d7621COc.jpg",
      alt: "Ethiopian Landscape"
    },
    {
      url: "https://i.imghippo.com/files/mJ3337PI.jpg",
      alt: "Ethiopian Tourism"
    },
    {
      url: "https://i.imghippo.com/files/ZQfS2757cM.jpg",
      alt: "Ethiopian Heritage"
    },
    {
      url: "https://i.imghippo.com/files/bMLD5552shY.jpg",
      alt: "Ethiopian Beauty"
    },
      {
      url: "https://i.imghippo.com/files/vv1031fOo.jpg",
      alt: "Ethiopian Beauty"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [heroImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75D4D9] via-[#FAC459] to-[#4A7863] origin-left z-50"
        style={{ scaleX }}
      />
      <Header />
      <main className="pt-28">
        {/* Hero Section with Carousel */}
        <section className="relative h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden">
          {/* Carousel Images */}
          <div className="absolute inset-0 w-full h-full">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.div 
            className="relative z-10 text-center text-white max-w-4xl mx-auto px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-serif text-6xl md:text-8xl font-light mb-6 tracking-tight leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Discover Ethiopia's Hidden Treasures
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-12 font-light tracking-wide max-w-2xl mx-auto drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Experience authentic Ethiopian hospitality, breathtaking landscapes, and unforgettable cultural journeys with Haro Dandi
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/hotels"
                  className="block px-10 py-4 bg-[#75D4D9] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#5AB8BD] transition-all duration-300 shadow-lg"
                >
                  Explore Our Lodges
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="block px-10 py-4 border-2 border-white text-white text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-[#4A7863] transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Experiences Section - Image on Right */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="lg:pr-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C] leading-tight"
                  whileHover={{ color: "#75D4D9", x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Experience Ethiopian hospitality with exclusive benefits
                </motion.h2>
                <motion.p 
                  className="text-[#666666] text-base font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Indulge in luxury with our curated collection of Ethiopia's best hotels and enjoy exclusive benefits for our valued guests.
                </motion.p>
              </motion.div>
              <motion.div 
                className="relative h-[500px] overflow-hidden shadow-lg group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src="https://i.imghippo.com/files/vv1031fOo.jpg"
                  alt="Ethiopian Hospitality"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Discover Section - Image on Left */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="relative h-[500px] overflow-hidden shadow-lg group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src="https://i.imghippo.com/files/kRWY5305ByE.jpg"
                  alt="Discover Ethiopia"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              <motion.div 
                className="lg:pl-16"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C] leading-tight"
                  whileHover={{ color: "#75D4D9", x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Discover new inspiration for your next journey
                </motion.h2>
                <motion.p 
                  className="text-[#666666] text-base font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Whether it's beautiful destinations or thrilling experiences, ignite your wanderlust and discover new reasons to travel and explore.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Section - Image on Right */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="lg:pr-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C] leading-tight"
                  whileHover={{ color: "#75D4D9", x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Belong to a community with a shared passion
                </motion.h2>
                <motion.p 
                  className="text-[#666666] text-base font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Connect with other travelers online or at our events and forge lasting friendships that transcend borders.
                </motion.p>
              </motion.div>
              <motion.div 
                className="relative h-[500px] overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src="https://i.imghippo.com/files/ckUa3138qpA.jpg"
                  alt="Ethiopian Community"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <motion.h2 
              className="font-serif text-4xl md:text-5xl font-normal mb-16 text-[#2C2C2C] text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Member benefits
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                  title: "Hotel Benefits",
                  desc: "Discover upgrades, late check-out and other benefits at partner hotels"
                },
                {
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  title: "Global Community",
                  desc: "Meet fellow travelers online at over 1000 exclusive events"
                },
                {
                  icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
                  title: "More Than 800 Events",
                  desc: "Meet fellow members at our exclusive events worldwide"
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  className="bg-[#E8DFD0] p-10 text-center cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <motion.div 
                    className="mb-4 flex justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-12 h-12 text-[#4A7863]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="font-serif mb-3 text-[#2C2C2C] uppercase tracking-wider text-sm"
                    whileHover={{ color: "#75D4D9" }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <p className="text-[#666666] text-sm font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
                  title: "Daily Travel Inspiration",
                  desc: "Fresh editorials every day to inspire your next trip"
                },
                {
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  title: "Travel Privileges",
                  desc: "Discover exclusive deals and upgrades from trusted travel brands"
                },
                {
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Hotel Deals",
                  desc: "Get the best hotel deals and travel hotels with our special offers"
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  className="bg-[#E8DFD0] p-10 text-center cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <motion.div 
                    className="mb-4 flex justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-12 h-12 text-[#4A7863]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="font-serif mb-3 text-[#2C2C2C] uppercase tracking-wider text-sm"
                    whileHover={{ color: "#75D4D9" }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <p className="text-[#666666] text-sm font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Travel Inspiration */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-[#2C2C2C] text-center" data-animate id="inspiration-title">
              Daily travel inspiration
            </h2>
            <div className="w-24 h-0.5 bg-[#C9A961] mx-auto mb-16 animate-pulse"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/tours" className="group" data-animate id="inspiration-1">
                <div className="relative h-[300px] mb-4 overflow-hidden shadow-lg">
                  <img
                    src="https://i.imghippo.com/files/RVXR3725Ww.jpg"
                    alt="Historic Sites"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 text-[#2C2C2C]">Exclusive Places to Explore</h3>
                <p className="text-[#666666] text-sm font-light">
                  Exceptional ways to discover Ethiopia's rich heritage
                </p>
              </Link>

              <Link href="/hotels" className="group">
                <div className="relative h-[300px] mb-4 overflow-hidden">
                  <img
                    src="https://i.imghippo.com/files/NdM9872Psc.jpg"
                    alt="Ethiopian Luxury Hotels"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 text-[#2C2C2C]">Luxury Hotels Worth the Journey</h3>
                <p className="text-[#666666] text-sm font-light">
                  Experience world-class hospitality in Ethiopia
                </p>
              </Link>

              <Link href="/tours" className="group">
                <div className="relative h-[300px] mb-4 overflow-hidden">
                  <img
                    src="https://i.imghippo.com/files/JoE2196uxw.jpg"
                    alt="Travel Destinations"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 text-[#2C2C2C]">Top Ethiopian Travel Destinations</h3>
                <p className="text-[#666666] text-sm font-light">
                  Where the world's most discerning travelers are heading
                </p>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/tours"
                className="inline-block px-8 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] text-xs tracking-widest uppercase font-medium hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
              >
                Read More →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1000px] mx-auto px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C]">
              A community for luxury travellers
            </h2>
            <p className="text-[#666666] text-lg font-light leading-relaxed mb-10 max-w-3xl mx-auto">
              Haro Dandi is the trusted community for modern luxury travellers. Find inspiration, book unique journeys, and connect with like-minded members.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
