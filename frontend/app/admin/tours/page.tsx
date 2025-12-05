"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api"
import type { Tour } from "@/types/index"
import Link from "next/link"

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await apiClient.getTours()
        setTours(response.data)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return

    try {
      await apiClient.deleteTour(id)
      setTours((prev) => prev.filter((t) => t._id !== id))
    } catch (error) {
      console.error("Error deleting tour:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">Tour Services</h1>
          <p className="text-[var(--color-neutral-600)]">Manage tour packages and travel experiences</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
        >
          ➕ New Tour
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : tours.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-[var(--color-neutral-600)]">No tours yet. Create your first tour package!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {tour.images[0] && (
                <img
                  src={tour.images[0] || "/placeholder.svg"}
                  alt={tour.contents[0]?.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{tour.contents[0]?.title}</h3>
                <p className="text-sm text-[var(--color-neutral-600)] mb-2">📍 {tour.destination}</p>
                <p className="text-sm text-[var(--color-neutral-600)] mb-4">⏱️ {tour.duration} Days</p>
                <p className="text-sm font-bold text-[var(--color-primary)] mb-4">${tour.pricePerPerson}/person</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/tours/${tour._id}`}
                    className="flex-1 px-3 py-2 bg-[var(--color-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tour._id)}
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
