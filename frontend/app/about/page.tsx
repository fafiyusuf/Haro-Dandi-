"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { useEffect } from "react"

export default function About() {
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
      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
          <div className="absolute inset-0">
            <img
              src="https://i.imghippo.com/files/Yh7076t.jpg"
              alt="About Haro Dandi"
              className="w-full h-full object-cover opacity-60 animate-fade-in"
            />
          </div>
          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-8">
            <h1 className="font-serif text-5xl md:text-7xl font-normal mb-6 tracking-tight animate-slide-up">Haro Dandi Hotel and Tourism</h1>
            <div className="w-24 h-1 bg-[#FAC459] mx-auto mb-6 animate-slide-up animation-delay-200"></div>
            <p className="text-xl md:text-2xl font-light opacity-95 mb-8 leading-relaxed animate-slide-up animation-delay-400">
              A Community-Driven Share Company Revolutionizing Ethiopia's Tourism Industry
            </p>
            <p className="text-base md:text-lg font-light opacity-85 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-600">
              Founded in 2015 E.C. with 314 community shareholders, we are building a prosperous future through 
              inclusive, sustainable, and innovative practices that benefit our communities and all who interact with us
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-animate id="about-text">
                <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2C2C2C] leading-tight hover:text-[#75D4D9] transition-colors duration-500">About Us</h2>
                <p className="text-[#666666] text-base font-light leading-relaxed mb-6">
                  Haro Dandi Hotel and Tourism Share Company (HDHT SC) was founded in 2015 E.C. (2023 G.C.). 
                  With a vision to revolutionize the hotel and tourism industries, HDHT SC is expanding into a diverse 
                  range of business areas.
                </p>
                <p className="text-[#666666] text-base font-light leading-relaxed">
                  A key feature of our success is the active involvement of our local community. We are a community-driven 
                  share company with 314 shareholders, including farmers and other local community members. Their investment 
                  in the company makes us a truly inclusive and community-oriented organization, ensuring that our success 
                  is shared and that we contribute to the well-being of the region.
                </p>
              </div>
              <div className="relative h-[500px] overflow-hidden shadow-lg group" data-animate id="about-img">
                <img
                  src="https://i.imghippo.com/files/vv1031fOo.jpg"
                  alt="Haro Dandi Community"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="bg-[#F8F7F5] py-24">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-center mb-16 text-[#2C2C2C]" data-animate id="stats-title">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "314", label: "Community Shareholders" },
                { number: "2015", label: "Year Founded (E.C.)" },
                { number: "2035", label: "Vision Target Year" },
                { number: "100%", label: "Community Driven" },
              ].map((stat, i) => (
                <div key={i} className="text-center transition-all duration-500 hover:scale-110 cursor-default" data-animate id={`stat-${i}`}>
                  <p className="font-serif text-5xl md:text-6xl font-light text-[#75D4D9] mb-2 hover:text-[#4A7863] transition-colors duration-300">{stat.number}</p>
                  <p className="text-[#666666] text-sm font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-center mb-16 text-[#2C2C2C]">Vision & Mission</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-[#F8F7F5] p-10 rounded-lg">
                <div className="w-16 h-16 bg-[#75D4D9] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#2C2C2C]">Our Vision</h3>
                <p className="text-[#666666] text-base font-light leading-relaxed">
                  Our vision is to become the leading and most competitive entity in the hotel and tourism sector in 
                  Ethiopia by 2035. We aim to set new standards for excellence and customer satisfaction, offering 
                  unparalleled eco-lodge and hotel services. Through this, we hope to revolutionize the industry while 
                  continuously expanding into other promising sectors.
                </p>
              </div>
              <div className="bg-[#F8F7F5] p-10 rounded-lg">
                <div className="w-16 h-16 bg-[#4A7863] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#2C2C2C]">Our Mission</h3>
                <p className="text-[#666666] text-base font-light leading-relaxed">
                  HDHT SC is dedicated to delivering world-class hospitality and tourism experiences, while maintaining 
                  a strong commitment to eco-friendly practices. Our mission is to foster sustainable growth, not only 
                  for the company but also for our shareholders and the communities we serve.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-center mb-16 text-[#2C2C2C]">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                { 
                  title: "Excellence", 
                  desc: "We are dedicated to providing top-tier services within the hotel, lodge, and tourism sectors, ensuring a superior experience for all our customers.",
                  icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                },
                { 
                  title: "Sustainability", 
                  desc: "We are committed to promoting environmentally responsible practices while empowering local communities for lasting social and economic development.",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                { 
                  title: "Inclusivity", 
                  desc: "We believe in the importance of inclusivity, ensuring that local farmers and communities actively participate and benefit from our growth and success.",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                },
                { 
                  title: "Innovation", 
                  desc: "We continuously strive to adapt and improve, innovating to meet the ever-evolving needs of the tourism and hospitality industry.",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                }
              ].map((value, i) => (
                <div key={i} className="text-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-[#75D4D9] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-[#75D4D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-[#2C2C2C]">{value.title}</h3>
                  <p className="text-[#666666] text-sm font-light leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>

            {/* Objectives */}
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-center mb-16 text-[#2C2C2C]">Our Objectives</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-[#F8F7F5] p-10 rounded-lg">
                <h3 className="font-serif text-2xl mb-6 text-[#2C2C2C]">Lodge and Hotel Industry</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#75D4D9] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Provide luxurious and culturally immersive accommodations that reflect the region's unique environment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#75D4D9] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Offer exceptional customer service to ensure memorable experiences for our guests</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#F8F7F5] p-10 rounded-lg">
                <h3 className="font-serif text-2xl mb-6 text-[#2C2C2C]">Tour and Travel Operations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4A7863] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Offer immersive travel experiences that showcase the natural beauty and cultural richness of the region and our country</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4A7863] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Promote sustainable tourism practices that support local communities and protect the environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shareholder Structure & Future Goals */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2C2C2C]">Shareholder Structure</h2>
                <p className="text-[#666666] text-base font-light leading-relaxed mb-6">
                  HDHT SC is proud to have 314 shareholders, with many of them being local farmers and community members 
                  who have entrusted their resources to the company.
                </p>
                <p className="text-[#666666] text-base font-light leading-relaxed">
                  This collaborative structure reflects our core values of shared prosperity and community development, 
                  ensuring our stakeholders benefit directly from the company's success.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2C2C2C]">Future Goals</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#FAC459] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Expand our presence within the hotel and tourism sectors to further strengthen our industry position</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#FAC459] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Enhance the quality of our services, aiming for regional and international recognition</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#FAC459] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#666666] text-base font-light">Strengthen partnerships with local communities to foster sustainable growth and mutual success</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-20 bg-[#4A7863] text-white">
          <div className="max-w-[1000px] mx-auto px-8 text-center">
            <p className="font-serif text-2xl md:text-3xl font-light leading-relaxed">
              At Haro Dandi Hotel and Tourism SC, we are dedicated to building a prosperous future through inclusive, 
              sustainable, and innovative practices that benefit our communities and all who interact with us.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
