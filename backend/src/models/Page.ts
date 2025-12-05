import mongoose, { type Document, Schema } from "mongoose"

export interface IPageContent {
  language: "en" | "am" | "om"
  title: string
  content: string
}

export interface IPage extends Document {
  slug: string
  title: string
  contents: IPageContent[]
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const pageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: [
      {
        language: {
          type: String,
          enum: ["en", "am", "om"],
          required: true,
        },
        title: String,
        content: String,
      },
    ],
    seoTitle: String,
    seoDescription: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IPage>("Page", pageSchema)
