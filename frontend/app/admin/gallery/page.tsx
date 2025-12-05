"use client"

import type React from "react"

import ImageUpload from "@/components/admin/image-upload"
import { apiClient } from "@/services/api"
import type { GalleryImage } from "@/types/index"
import { useEffect, useState } from "react"

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [imageTitle, setImageTitle] = useState("")
  const [category, setCategory] = useState<"hotel" | "tour" | "experience" | "other">("other")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await apiClient.getGalleryImages()
      setImages(response.data)
    } catch (error) {
      console.error("Error fetching gallery images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadedUrls.length || !imageTitle) {
      alert("Please upload at least one image and provide a title")
      return
    }

    try {
      for (const url of uploadedUrls) {
        const response = await apiClient.createGalleryImage({
          url,
          title: imageTitle,
          category,
          order: images.length,
        })
        setImages((prev) => [...prev, response.data])
      }
      setUploadedUrls([])
      setImageTitle("")
    } catch (error) {
      console.error("Error adding image:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await apiClient.deleteGalleryImage(id)
      setImages((prev) => prev.filter((img) => img._id !== id))
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-2">Gallery</h1>
      <p className="text-[var(--color-neutral-600)] mb-8">Manage gallery images</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Add Images</h2>
          <form onSubmit={handleAddImage} className="space-y-4">
            <ImageUpload
              images={uploadedUrls}
              onImagesChange={setUploadedUrls}
              maxImages={5}
              label="Upload Images"
            />
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="Image title"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="hotel">Hotel</option>
                <option value="tour">Tour</option>
                <option value="experience">Experience</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
            >
              Add Images to Gallery
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img._id} className="relative group">
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={img.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-xs text-[var(--color-neutral-600)] mt-1 truncate">{img.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
