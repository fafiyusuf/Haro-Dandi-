"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api"
import type { Hotel } from "@/types/index"
import Link from "next/link"

export default function AdminHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await apiClient.getHotels()
        setHotels(response.data)
      } catch (error) {
        console.error("Error fetching hotels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHotels()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return

    try {
      await apiClient.deleteHotel(id)
      setHotels((prev) => prev.filter((h) => h._id !== id))
    } catch (error) {
      console.error("Error deleting hotel:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">Hotels & Lodges</h1>
          <p className="text-[var(--color-neutral-600)]">Manage hotel listings and information</p>
        </div>
        <Link
          href="/admin/hotels/new"
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
        >
          ➕ New Hotel
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-[var(--color-neutral-600)]">No hotels yet. Add your first hotel!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {hotel.images[0] && (
                <img
                  src={hotel.images[0] || "/placeholder.svg"}
                  alt={hotel.contents[0]?.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{hotel.contents[0]?.name}</h3>
                <p className="text-sm text-[var(--color-neutral-600)] mb-4">📍 {hotel.location}</p>
                <p className="text-sm font-bold text-[var(--color-primary)] mb-4">${hotel.pricePerNight}/night</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/hotels/${hotel._id}`}
                    className="flex-1 px-3 py-2 bg-[var(--color-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
