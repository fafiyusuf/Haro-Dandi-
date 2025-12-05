"use client"

import type React from "react"

import ImageUpload from "@/components/admin/image-upload"
import { apiClient } from "@/services/api"
import type { Tour } from "@/types/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditTour() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id !== "new") {
      const fetchTour = async () => {
        try {
          const response = await apiClient.getTours()
          const found = response.data.find((t: any) => t._id === id)
          setTour(found)
        } catch (error) {
          console.error("Error fetching tour:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchTour()
    } else {
      setIsLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (id === "new") {
        await apiClient.createTour(tour)
      } else {
        await apiClient.updateTour(id, tour)
      }
      router.push("/admin/tours")
    } catch (error) {
      console.error("Error saving tour:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold mb-8">{id === "new" ? "Create New Tour" : "Edit Tour"}</h1>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tour Title</label>
              <input
                type="text"
                value={tour?.contents[0]?.title || ""}
                onChange={(e) =>
                  setTour(
                    tour
                      ? {
                          ...tour,
                          contents: tour.contents.map((c, i) => (i === 0 ? { ...c, title: e.target.value } : c)),
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
                value={tour?.slug || ""}
                onChange={(e) => setTour(tour ? { ...tour, slug: e.target.value } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Destination</label>
              <input
                type="text"
                value={tour?.destination || ""}
                onChange={(e) => setTour(tour ? { ...tour, destination: e.target.value } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration (Days)</label>
              <input
                type="number"
                value={tour?.duration || ""}
                onChange={(e) => setTour(tour ? { ...tour, duration: Number.parseInt(e.target.value) } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price Per Person ($)</label>
              <input
                type="number"
                value={tour?.pricePerPerson || ""}
                onChange={(e) => setTour(tour ? { ...tour, pricePerPerson: Number.parseFloat(e.target.value) } : null)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={tour?.contents[0]?.description || ""}
              onChange={(e) =>
                setTour(
                  tour
                    ? {
                        ...tour,
                        contents: tour.contents.map((c, i) => (i === 0 ? { ...c, description: e.target.value } : c)),
                      }
                    : null,
                )
              }
              rows={5}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <ImageUpload
            images={tour?.images || []}
            onImagesChange={(images) => setTour(tour ? { ...tour, images } : null)}
            maxImages={10}
            label="Tour Images"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 font-medium"
            >
              {isSaving ? "Saving..." : "Save Tour"}
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
