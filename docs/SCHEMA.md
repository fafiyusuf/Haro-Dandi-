# Database Schema

## Admin
User accounts for dashboard access with password-based authentication.

\`\`\`typescript
{
  email: string (unique, indexed)
  password: string (hashed with bcryptjs)
  name: string
  role: 'super_admin' | 'admin'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Page
Static content pages for the website.

\`\`\`typescript
{
  slug: string (unique, indexed)
  title: string
  contents: [
    {
      language: 'en' | 'am' | 'om'
      title?: string
      content?: string
    }
  ]
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Hotel
Hotel and lodge listings.

\`\`\`typescript
{
  slug: string (unique)
  contents: [
    {
      language: 'en' | 'am' | 'om'
      name: string
      description: string
      amenities: string[]
    }
  ]
  location: string
  pricePerNight: number
  images: string[]
  rating?: number (0-5)
  reviews?: number
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Tour
Tour packages and travel experiences.

\`\`\`typescript
{
  slug: string (unique)
  contents: [
    {
      language: 'en' | 'am' | 'om'
      title: string
      description: string
      itinerary: string[]
    }
  ]
  duration: number (days)
  pricePerPerson: number
  groupSize: {
    min: number
    max: number
  }
  images: string[]
  destination: string
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## GalleryImage
Gallery images for the website.

\`\`\`typescript
{
  url: string
  title: string
  description?: string
  category: 'hotel' | 'tour' | 'experience' | 'other'
  order: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## ContactMessage
Contact form submissions.

\`\`\`typescript
{
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  isResponded: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Translation
Multi-language text content.

\`\`\`typescript
{
  key: string (lowercase, unique with language)
  language: 'en' | 'am' | 'om'
  value: string
  category: string (default: 'common')
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Indexes

\`\`\`javascript
// Admin
db.admins.createIndex({ email: 1 })

// Pages
db.pages.createIndex({ slug: 1 })

// Hotels
db.hotels.createIndex({ slug: 1 })
db.hotels.createIndex({ isPublished: 1 })

// Tours
db.tours.createIndex({ slug: 1 })
db.tours.createIndex({ isPublished: 1 })

// Translations
db.translations.createIndex({ key: 1, language: 1 }, { unique: true })
