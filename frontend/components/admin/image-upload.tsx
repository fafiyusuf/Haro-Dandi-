"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  label?: string
}

export default function ImageUpload({ images, onImagesChange, maxImages = 10, label = "Images" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const newImages: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            if (e.target?.result) {
              newImages.push(e.target.result as string)
            }
            resolve()
          }
          reader.readAsDataURL(file)
        })
      }

      onImagesChange([...images, ...newImages].slice(0, maxImages))
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Failed to upload images. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      onImagesChange([...images, url])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-gray-700">{label}</label>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square bg-gray-100 border border-gray-300 group overflow-hidden">
            <Image src={image} alt={`Image ${index + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="aspect-square border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs text-gray-500 text-center px-2">
              {uploading ? "Uploading..." : "Add Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddImageUrl}
          className="text-xs px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors tracking-wide"
        >
          Add Image URL
        </button>
        <span className="text-xs text-gray-500 self-center">
          {images.length} / {maxImages} images
        </span>
      </div>
    </div>
  )
}
