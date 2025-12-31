"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Eye, 
  Zap, 
  Target, 
  Users, 
  Leaf, 
  Globe, 
  Sparkles, 
  Award, 
  TrendingUp,
  Heart,
  CheckCircle,
  BarChart3,
  Building2
} from "lucide-react"
// Import your translation setup
import { useTranslation } from "react-i18next"

export default function About() {
  // Get translation function
  const { t } = useTranslation()
  
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

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Modern */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-gray-900/80"></div>
            <motion.img
              src="images/lake.png"
              alt={t("aboutHero.alt") || "About Haro Dandi"}
              className="w-full h-full object-cover opacity-40"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 50, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light mb-8 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-amber-100 to-emerald-100 bg-clip-text text-transparent">
                {t("companyName") || "Haro Dandi"}
              </span>
            </motion.h1>

            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />

            <motion.p 
              className="text-2xl md:text-3xl font-light opacity-95 mb-8 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {t("aboutHero.subtitle") || "A Community-Driven Share Company Revolutionizing Ethiopia's Tourism Industry"}
            </motion.p>

            <motion.p 
              className="text-lg md:text-xl font-light opacity-85 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {t("aboutHero.description") || "Founded in 2015 E.C. with 314 community shareholders, we are building a prosperous future through inclusive, sustainable, and innovative practices that benefit our communities and all who interact with us"}
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
          </motion.div>
        </section>

        {/* Company Overview - Modern */}
        <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="lg:pr-12"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                  <span className="text-sm font-semibold tracking-wider text-amber-500 uppercase">
                    {t("aboutStory") || "Our Story"}
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                  {t("about") || "About Us"}
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("aboutParagraph1") || "Haro Dandi Hotel and Tourism Share Company (HDHT SC) was founded in 2015 E.C. (2023 G.C.). With a vision to revolutionize the hotel and tourism industries, HDHT SC is expanding into a diverse range of business areas."}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("aboutParagraph2") || "A key feature of our success is the active involvement of our local community. We are a community-driven share company with 314 shareholders, including farmers and other local community members. Their investment in the company makes us a truly inclusive and community-oriented organization, ensuring that our success is shared and that we contribute to the well-being of the region."}
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                  <motion.img
                    src="images/card.png"
                    alt={t("aboutImageAlt") || "Haro Dandi Community"}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Floating Stats */}
                  <motion.div 
                    className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">314</div>
                        <div className="text-sm font-medium text-gray-600">
                          {t("aboutShareholders") || "Shareholders"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                        <div className="text-sm font-medium text-gray-600">
                          {t("aboutCommunity") || "Community"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">2015</div>
                        <div className="text-sm font-medium text-gray-600">
                          {t("aboutFounded") || "Founded"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Stats - Modern */}
        <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                <span className="text-sm font-semibold tracking-wider text-emerald-500 uppercase">
                  {t("aboutImpactNumbers") || "Impact in Numbers"}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t("aboutByNumbers") || "By The Numbers"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { 
                  number: "314", 
                  label: t("aboutNumbersShareholders") || "Community Shareholders",
                  icon: <Users className="w-8 h-8" />,
                  gradient: "from-blue-400 to-cyan-300"
                },
                { 
                  number: "2015", 
                  label: t("aboutNumbersFounded") || "Year Founded (E.C.)",
                  icon: <Building2 className="w-8 h-8" />,
                  gradient: "from-emerald-400 to-teal-300"
                },
                { 
                  number: "2035", 
                  label: t("aboutNumbersVision") || "Vision Target Year",
                  icon: <Target className="w-8 h-8" />,
                  gradient: "from-amber-400 to-yellow-300"
                },
                { 
                  number: "100%", 
                  label: t("aboutNumbersCommunity") || "Community Driven",
                  icon: <Heart className="w-8 h-8" />,
                  gradient: "from-rose-400 to-pink-300"
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    
                    {/* Number */}
                    <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-amber-500 group-hover:to-emerald-500 transition-all duration-300">
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission - Modern */}
        <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 rounded-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center mb-8">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-gray-900">
                    {t("vision") || "Our Vision"}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("aboutVisionDescription") || "Our vision is to become the leading and most competitive entity in the hotel and tourism sector in Ethiopia by 2035. We aim to set new standards for excellence and customer satisfaction, offering unparalleled eco-lodge and hotel services. Through this, we hope to revolutionize the industry while continuously expanding into other promising sectors."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center mb-8">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-gray-900">
                    {t("vision") || "Our Mission"}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("aboutMissionDescription") || "HDHT SC is dedicated to delivering world-class hospitality and tourism experiences, while maintaining a strong commitment to eco-friendly practices. Our mission is to foster sustainable growth, not only for the company but also for our shareholders and the communities we serve."}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Core Values - Modern */}
            <div className="mb-20">
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
                    {t("aboutFoundation") || "Our Foundation"}
                  </span>
                  <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                  {t("aboutCoreValues") || "Core Values"}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    key: "excellence",
                    title: t("aboutExcellenceTitle") || "Excellence", 
                    desc: t("aboutExcellenceDescription") || "We are dedicated to providing top-tier services within the hotel, lodge, and tourism sectors, ensuring a superior experience for all our customers.",
                    icon: <Award className="w-8 h-8" />,
                    gradient: "from-blue-400 to-cyan-300"
                  },
                  { 
                    key: "sustainability",
                    title: t("aboutSustainabilityTitle") || "Sustainability", 
                    desc: t("aboutSustainabilityDescription") || "We are committed to promoting environmentally responsible practices while empowering local communities for lasting social and economic development.",
                    icon: <Leaf className="w-8 h-8" />,
                    gradient: "from-emerald-400 to-teal-300"
                  },
                  { 
                    key: "inclusivity",
                    title: t("aboutInclusivityTitle") || "Inclusivity", 
                    desc: t("aboutInclusivityDescription") || "We believe in the importance of inclusivity, ensuring that local farmers and communities actively participate and benefit from our growth and success.",
                    icon: <Users className="w-8 h-8" />,
                    gradient: "from-amber-400 to-yellow-300"
                  },
                  { 
                    key: "innovation",
                    title: t("aboutInnovationTitle") || "Innovation", 
                    desc: t("aboutInnovationDescription") || "We continuously strive to adapt and improve, innovating to meet the ever-evolving needs of the tourism and hospitality industry.",
                    icon: <Sparkles className="w-8 h-8" />,
                    gradient: "from-violet-400 to-purple-300"
                  }
                ].map((value, i) => (
                  <motion.div
                    key={value.key}
                    className="group relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {value.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Objectives - Modern */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                <span className="text-sm font-semibold tracking-wider text-emerald-500 uppercase">
                  {t("aboutGoals") || "Our Goals"}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t("aboutObjectives") || "Our Objectives"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 rounded-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t("aboutLodgeTitle") || "Lodge and Hotel Industry"}
                    </h3>
                  </div>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">
                        {t("aboutLodgeItem1") || "Provide luxurious and culturally immersive accommodations that reflect the region's unique environment"}
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">
                        {t("aboutLodgeItem2") || "Offer exceptional customer service to ensure memorable experiences for our guests"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t("aboutTourTitle") || "Tour and Travel Operations"}
                    </h3>
                  </div>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">
                        {t("aboutTourItem1") || "Offer immersive travel experiences that showcase the natural beauty and cultural richness of the region and our country"}
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">
                        {t("aboutTourItem2") || "Promote sustainable tourism practices that support local communities and protect the environment"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Shareholder Structure & Future Goals - Modern */}
        <section className="py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                  <span className="text-sm font-semibold tracking-wider text-amber-400 uppercase">
                    {t("aboutOwnershipStructure") || "Ownership Structure"}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {t("aboutShareholderStructure") || "Shareholder Structure"}
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg opacity-90 leading-relaxed">
                    {t("aboutShareholderParagraph1") || "HDHT SC is proud to have 314 shareholders, with many of them being local farmers and community members who have entrusted their resources to the company."}
                  </p>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {t("aboutShareholderParagraph2") || "This collaborative structure reflects our core values of shared prosperity and community development, ensuring our stakeholders benefit directly from the company's success."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
                  <span className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                    {t("aboutLookingAhead") || "Looking Ahead"}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {t("aboutFutureGoals") || "Future Goals"}
                </h2>
                
                <ul className="space-y-6">
                  {[
                    t("aboutFutureGoal1") || "Expand our presence within the hotel and tourism sectors to further strengthen our industry position",
                    t("aboutFutureGoal2") || "Enhance the quality of our services, aiming for regional and international recognition",
                    t("aboutFutureGoal3") || "Strengthen partnerships with local communities to foster sustainable growth and mutual success"
                  ].map((goal, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg opacity-90 leading-relaxed">{goal}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing Statement - Modern */}
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400"></div>
          
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
                <span className="text-white font-semibold">
                  {t("aboutOurCommitment") || "Our Commitment"}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                {t("aboutBuildingTomorrow") || "Building Tomorrow, Together"}
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed">
                {t("aboutClosingDescription") || "At Haro Dandi Hotel and Tourism SC, we are dedicated to building a prosperous future through inclusive, sustainable, and innovative practices that benefit our communities and all who interact with us."}
              </p>
              
              <div className="mt-16 grid grid-cols-3 gap-8">
                {[
                  { value: "314+", label: t("aboutClosingStat1") || "Shareholders" },
                  { value: "100%", label: t("aboutClosingStat2") || "Community Owned" },
                  { value: "∞", label: t("aboutClosingStat3") || "Future Impact" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}