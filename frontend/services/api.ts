import { useAuthStore } from "@/stores/useAuthStore"
import axios, { type AxiosInstance } from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://haro-dandi.onrender.com/"

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 10000,
    })


    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Handle response errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().clearAuth()
          window.location.href = "/admin/login"
        }
        return Promise.reject(error)
      },
    )
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.client.post("/api/auth/login", { email, password })
  }

  async getCurrentAdmin() {
    return this.client.get("/api/auth/me")
  }

  async logout() {
    return this.client.post("/api/auth/logout")
  }

  // Pages endpoints
  async getPages() {
    return this.client.get("/api/pages")
  }

  async getPageBySlug(slug: string) {
    return this.client.get(`/api/pages/${slug}`)
  }

  async createPage(data: any) {
    return this.client.post("/api/pages", data)
  }

  async updatePage(id: string, data: any) {
    return this.client.put(`/api/pages/${id}`, data)
  }

  async deletePage(id: string) {
    return this.client.delete(`/api/pages/${id}`)
  }

  // Hotels endpoints
  async getHotels() {
    return this.client.get("/api/hotels")
  }

  async getHotelBySlug(slug: string) {
    return this.client.get(`/api/hotels/${slug}`)
  }

  async createHotel(data: any) {
    return this.client.post("/api/hotels", data)
  }

  async updateHotel(id: string, data: any) {
    return this.client.put(`/api/hotels/${id}`, data)
  }

  async deleteHotel(id: string) {
    return this.client.delete(`/api/hotels/${id}`)
  }

  // Tours endpoints
  async getTours() {
    return this.client.get("/api/tours")
  }

  async getTourBySlug(slug: string) {
    return this.client.get(`/api/tours/${slug}`)
  }

  async createTour(data: any) {
    return this.client.post("/api/tours", data)
  }

  async updateTour(id: string, data: any) {
    return this.client.put(`/api/tours/${id}`, data)
  }

  async deleteTour(id: string) {
    return this.client.delete(`/api/tours/${id}`)
  }

  // Gallery endpoints
  async getGalleryImages(category?: string) {
    const params = category ? { category } : {}
    return this.client.get("/api/gallery", { params })
  }

  async createGalleryImage(data: any) {
    return this.client.post("/api/gallery", data)
  }

  async updateGalleryImage(id: string, data: any) {
    return this.client.put(`/api/gallery/${id}`, data)
  }

  async deleteGalleryImage(id: string) {
    return this.client.delete(`/api/gallery/${id}`)
  }

  // Contact endpoints
  async submitContactForm(data: any) {
    return this.client.post("/api/contact", data)
  }

  async getContactMessages() {
    return this.client.get("/api/contact")
  }

  async markMessageAsRead(id: string) {
    return this.client.patch(`/api/contact/${id}/read`)
  }

  async deleteContactMessage(id: string) {
    return this.client.delete(`/api/contact/${id}`)
  }

  // Translations endpoints
  async getTranslations(language: "en" | "am" | "om") {
    return this.client.get(`/api/translations/${language}`)
  }

  async createTranslation(data: any) {
    return this.client.post("/api/translations", data)
  }

  async updateTranslation(id: string, data: any) {
    return this.client.put(`/api/translations/${id}`, data)
  }

  async deleteTranslation(id: string) {
    return this.client.delete(`/api/translations/${id}`)
  }
}

export const apiClient = new ApiClient()
