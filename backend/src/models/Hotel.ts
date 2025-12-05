import mongoose, { type Document, Schema } from "mongoose"

export interface IHotelContent {
  language: "en" | "am" | "om"
  name: string
  description: string
  amenities: string[]
}

export interface IHotel extends Document {
  slug: string
  contents: IHotelContent[]
  location: string
  pricePerNight: number
  images: string[]
  rating: number
  reviews: number
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const hotelSchema = new Schema<IHotel>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contents: [
      {
        language: {
          type: String,
          enum: ["en", "am", "om"],
          required: true,
        },
        name: String,
        description: String,
        amenities: [String],
      },
    ],
    location: String,
    pricePerNight: Number,
    images: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: Number,
    seoTitle: String,
    seoDescription: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IHotel>("Hotel", hotelSchema)
