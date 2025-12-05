import { create } from "zustand"
import type { Hotel, Tour, Page, GalleryImage } from "@/types/index"

interface ContentState {
  hotels: Hotel[]
  tours: Tour[]
  pages: Page[]
  galleryImages: GalleryImage[]
  isLoading: boolean
  error: string | null
  setHotels: (hotels: Hotel[]) => void
  setTours: (tours: Tour[]) => void
  setPages: (pages: Page[]) => void
  setGalleryImages: (images: GalleryImage[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useContentStore = create<ContentState>((set) => ({
  hotels: [],
  tours: [],
  pages: [],
  galleryImages: [],
  isLoading: false,
  error: null,
  setHotels: (hotels) => set({ hotels }),
  setTours: (tours) => set({ tours }),
  setPages: (pages) => set({ pages }),
  setGalleryImages: (images) => set({ galleryImages: images }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
