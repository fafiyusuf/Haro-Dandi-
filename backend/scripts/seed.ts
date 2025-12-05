import dotenv from "dotenv"
import { connectDB } from "../src/config/database.js"
import Admin from "../src/models/Admin.js"
import GalleryImage from "../src/models/Gallery.js"
import Hotel from "../src/models/Hotel.js"
import Page from "../src/models/Page.js"
import Tour from "../src/models/Tour.js"
import Translation from "../src/models/Translation.js"

dotenv.config()

const seed = async () => {
  try {
    await connectDB()
    console.log("[Seed] Connected to database")

    // Clear existing data
    await Admin.deleteMany({})
    await Hotel.deleteMany({})
    await Tour.deleteMany({})
    await Page.deleteMany({})
    await Translation.deleteMany({})
    await GalleryImage.deleteMany({})

    // Create admin
    const admin = new Admin({
      email: "admin@harodandi.com",
      password: "Admin@1234",
      name: "Admin User",
      role: "super_admin",
    })
    await admin.save()
    console.log("[Seed] Created admin user")

    // Create sample hotel
    const hotel = new Hotel({
      slug: "addis-resort",
      contents: [
        {
          language: "en",
          name: "Addis Resort",
          description: "Luxurious resort in the heart of Addis Ababa with stunning views and world-class amenities. Experience Ethiopian hospitality at its finest with our spacious rooms, excellent dining, and convenient location near major attractions.",
          amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness Center", "Restaurant", "Bar & Lounge", "24/7 Room Service", "Fitness Center", "Conference Rooms", "Airport Shuttle", "Laundry Service"],
        },
      ],
      location: "Addis Ababa",
      pricePerNight: 150,
      images: [
        "/assets/hotel-1-main.jpg",
        "/assets/hotel-1-room.jpg", 
        "/assets/hotel-1-pool.jpg",
        "/assets/hotel-1-restaurant.jpg",
        "/assets/hotel-1-lobby.jpg"
      ],
      rating: 4.5,
      reviews: 42,
      isPublished: true,
    })
    await hotel.save()
    console.log("[Seed] Created sample hotel")

    // Create sample tour
    const tour = new Tour({
      slug: "addis-city-tour",
      contents: [
        {
          language: "en",
          title: "Addis City Explorer",
          description: "Explore the vibrant capital of Ethiopia",
          itinerary: [
            "Day 1: National Museum & Meskel Square",
            "Day 2: Addis Ababa Market Tour",
            "Day 3: Holy Trinity Cathedral & Lunch with Ethiopian musicians",
          ],
        },
      ],
      duration: 3,
      pricePerPerson: 250,
      groupSize: { min: 2, max: 12 },
      destination: "Addis Ababa",
      images: ["/placeholder.svg?key=t1"],
      isPublished: true,
    })
    await tour.save()
    console.log("[Seed] Created sample tour")

    // Create sample page
    const page = new Page({
      slug: "about",
      title: "About Us",
      contents: [
        {
          language: "en",
          title: "About Haro Dandi",
          content: "Haro Dandi Hotel and Tourism is a community-driven hospitality company...",
        },
      ],
      isPublished: true,
    })
    await page.save()
    console.log("[Seed] Created sample page")

    // Create sample translations
    const translations = [
      { key: "nav.home", language: "en", value: "Home", category: "navigation" },
      { key: "nav.about", language: "en", value: "About Us", category: "navigation" },
      { key: "nav.hotels", language: "en", value: "Hotels", category: "navigation" },
      { key: "nav.tours", language: "en", value: "Tours", category: "navigation" },
    ]

    for (const trans of translations) {
      await Translation.create(trans)
    }
    console.log("[Seed] Created sample translations")

    // Create sample gallery image
    const galleryImage = new GalleryImage({
      url: "/placeholder.svg?key=g1",
      title: "Hotel Lobby",
      category: "hotel",
      order: 0,
      isPublished: true,
    })
    await galleryImage.save()
    console.log("[Seed] Created sample gallery image")

    console.log("[Seed] Database seeded successfully!")
    console.log("[Seed] Demo admin: admin@harodandi.com / Admin@1234")

    process.exit(0)
  } catch (error) {
    console.error("[Seed] Error:", error)
    process.exit(1)
  }
}

seed()
