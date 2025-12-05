import mongoose, { type Document, Schema } from "mongoose"

export interface ITourContent {
  language: "en" | "am" | "om"
  title: string
  description: string
  itinerary: string[]
}

export interface ITour extends Document {
  slug: string
  contents: ITourContent[]
  duration: number // in days
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

const tourSchema = new Schema<ITour>(
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
        title: String,
        description: String,
        itinerary: [String],
      },
    ],
    duration: Number,
    pricePerPerson: Number,
    groupSize: {
      min: Number,
      max: Number,
    },
    images: [String],
    destination: String,
    seoTitle: String,
    seoDescription: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<ITour>("Tour", tourSchema)
