"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/stores/useContentStore"
import { apiClient } from "@/services/api"

export default function AdminDashboard() {
  const { hotels, tours, pages, galleryImages } = useContentStore()
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalTours: 0,
    totalPages: 0,
    totalImages: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hotelsRes, toursRes, pagesRes, galleryRes] = await Promise.all([
          apiClient.getHotels(),
          apiClient.getTours(),
          apiClient.getPages(),
          apiClient.getGalleryImages(),
        ])

        setStats({
          totalHotels: hotelsRes.data.length,
          totalTours: toursRes.data.length,
          totalPages: pagesRes.data.length,
          totalImages: galleryRes.data.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { label: "Hotels & Lodges", value: stats.totalHotels, icon: "🏨", color: "bg-blue-50 text-blue-700" },
    { label: "Tours", value: stats.totalTours, icon: "✈️", color: "bg-green-50 text-green-700" },
    { label: "Pages", value: stats.totalPages, icon: "📄", color: "bg-purple-50 text-purple-700" },
    { label: "Gallery Images", value: stats.totalImages, icon: "🖼️", color: "bg-orange-50 text-orange-700" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] mb-2">Dashboard</h1>
        <p className="text-[var(--color-neutral-600)]">Welcome to the Haro Dandi Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-2xl mb-4`}>
              {card.icon}
            </div>
            <p className="text-sm text-[var(--color-neutral-600)] mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-[var(--foreground)]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a
              href="/admin/pages"
              className="block px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
            >
              ➕ Create New Page
            </a>
            <a
              href="/admin/hotels"
              className="block px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
            >
              ➕ Add New Hotel
            </a>
            <a
              href="/admin/tours"
              className="block px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
            >
              ➕ Create Tour Package
            </a>
            <a
              href="/admin/gallery"
              className="block px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
            >
              ➕ Upload Gallery Image
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Updates</h2>
          <div className="space-y-3 text-sm">
            <p className="text-[var(--color-neutral-600)]">
              🔔 <strong>System Ready</strong>
              <br />
              Admin dashboard is fully operational.
            </p>
            <p className="text-[var(--color-neutral-600)]">
              ✅ <strong>Database Connected</strong>
              <br />
              All services are running smoothly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
