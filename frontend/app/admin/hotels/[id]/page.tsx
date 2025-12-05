"use client"

import type React from "react"

import ImageUpload from "@/components/admin/image-upload"
import { apiClient } from "@/services/api"
import type { Hotel } from "@/types/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditHotel() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id !== "new") {
      const fetchHotel = async () => {
        try {
          const response = await apiClient.getHotels()
          const found = response.data.find((h: any) => h._id === id)
          setHotel(found)
        } catch (error) {
          console.error("Error fetching hotel:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchHotel()
    } else {
      setIsLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (id === "new") {
        await apiClient.createHotel(hotel)
      } else {
        await apiClient.updateHotel(id, hotel)
      }
      router.push("/admin/hotels")
    } catch (error) {
      console.error("Error saving hotel:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold mb-8">{id === "new" ? "Create New Hotel" : "Edit Hotel"}</h1>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hotel Name</label>
              <input
                type="text"
                value={hotel?.contents[0]?.name || ""}
                onChange={(e) =>
                  setHotel(
                    hotel
                      ? {
                          ...hotel,
                          contents: hotel.contents.map((c, i) => (i === 0 ? { ...c, name: e.target.value } : c)),
                        }
                      : null,
                  )
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={hotel?.slug || ""}
                onChange={(e) => setHotel(hotel ? { ...hotel, slug: e.target.value } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={hotel?.location || ""}
                onChange={(e) => setHotel(hotel ? { ...hotel, location: e.target.value } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price Per Night ($)</label>
              <input
                type="number"
                value={hotel?.pricePerNight || ""}
                onChange={(e) =>
                  setHotel(hotel ? { ...hotel, pricePerNight: Number.parseFloat(e.target.value) } : null)
                }
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={hotel?.contents[0]?.description || ""}
              onChange={(e) =>
                setHotel(
                  hotel
                    ? {
                        ...hotel,
                        contents: hotel.contents.map((c, i) => (i === 0 ? { ...c, description: e.target.value } : c)),
                      }
                    : null,
                )
              }
              rows={5}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <ImageUpload
            images={hotel?.images || []}
            onImagesChange={(images) => setHotel(hotel ? { ...hotel, images } : null)}
            maxImages={10}
            label="Hotel Images"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 font-medium"
            >
              {isSaving ? "Saving..." : "Save Hotel"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--color-neutral-50)] font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
