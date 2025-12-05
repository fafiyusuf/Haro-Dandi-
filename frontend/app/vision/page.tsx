"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Vision() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white py-20">
          <div className="container-custom">
            <h1 className="font-serif text-5xl font-bold mb-4">Vision, Mission & Values</h1>
            <p className="text-xl opacity-90">Our commitment to excellence and sustainability</p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[var(--color-primary)]">
                <h2 className="font-serif text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-[var(--color-neutral-600)] leading-relaxed">
                  To become the leading and most competitive entity in the hotel and tourism sector in Ethiopia by 2035.
                  We aim to set new standards for excellence and customer satisfaction, offering unparalleled eco-lodge
                  and hotel services while continuously expanding into other promising sectors.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[var(--color-accent)]">
                <h2 className="font-serif text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-[var(--color-neutral-600)] leading-relaxed">
                  We are dedicated to delivering world-class hospitality and tourism experiences while maintaining a
                  strong commitment to eco-friendly practices. Our mission is to foster sustainable growth, not only for
                  the company but also for our shareholders and the communities we serve.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mt-24">
              <h2 className="font-serif text-4xl font-bold text-center mb-16">Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: "⭐",
                    title: "Excellence",
                    description:
                      "We are dedicated to providing top-tier services within the hotel, lodge, and tourism sectors, ensuring a superior experience for all our customers.",
                  },
                  {
                    icon: "🌱",
                    title: "Sustainability",
                    description:
                      "We are committed to promoting environmentally responsible practices while empowering local communities for social and economic development.",
                  },
                  {
                    icon: "🤝",
                    title: "Inclusivity",
                    description:
                      "We believe in the importance of inclusivity, ensuring that local farmers and communities actively participate and benefit from our growth and success.",
                  },
                  {
                    icon: "💡",
                    title: "Innovation",
                    description:
                      "We continuously strive to adapt and improve, innovating to meet the ever-evolving needs of the tourism and hospitality industry.",
                  },
                ].map((value, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-[var(--color-primary)] from-0% to-[var(--color-primary-dark)] to-100% text-white rounded-lg p-8"
                  >
                    <p className="text-5xl mb-4">{value.icon}</p>
                    <h3 className="font-serif text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="opacity-90">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Objectives */}
        <section className="bg-[var(--color-neutral-50)] py-24">
          <div className="container-custom">
            <h2 className="font-serif text-4xl font-bold mb-16">Strategic Objectives</h2>

            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold mb-4">Lodge and Hotel Industry</h3>
                <ul className="space-y-3 text-[var(--color-neutral-600)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                    <span>
                      Provide luxurious and culturally immersive accommodations that reflect the region's unique
                      environment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                    <span>Offer exceptional customer service to ensure memorable experiences for our guests</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold mb-4">Tour and Travel Operations</h3>
                <ul className="space-y-3 text-[var(--color-neutral-600)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                    <span>
                      Offer immersive travel experiences that showcase the natural beauty and cultural richness of the
                      region and our country
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                    <span>
                      Promote sustainable tourism practices that support local communities and protect the environment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
