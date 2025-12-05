export interface Hotel {
  _id: string
  slug: string
  contents: ContentItem[]
  location: string
  pricePerNight: number
  images: string[]
  rating: number
  reviews: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Tour {
  _id: string
  slug: string
  contents: ContentItem[]
  duration: number
  pricePerPerson: number
  groupSize: { min: number; max: number }
  images: string[]
  destination: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Page {
  _id: string
  slug: string
  title: string
  contents: ContentItem[]
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface ContentItem {
  language: "en" | "am" | "om"
  title?: string
  name?: string
  content?: string
  description?: string
  amenities?: string[]
  itinerary?: string[]
}

export interface GalleryImage {
  _id: string
  url: string
  title: string
  description?: string
  category: "hotel" | "tour" | "experience" | "other"
  order: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface Admin {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin"
}

export interface AuthResponse {
  token: string
  admin: Admin
}
