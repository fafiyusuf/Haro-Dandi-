import mongoose, { type Document, Schema } from "mongoose"

export interface IGalleryImage extends Document {
  url: string
  title: string
  description?: string
  category: string
  order: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const galleryImageSchema = new Schema<IGalleryImage>(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["hotel", "tour", "experience", "other"],
      default: "other",
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IGalleryImage>("GalleryImage", galleryImageSchema)
