import mongoose, { type Document, Schema } from "mongoose"

export interface ITranslation extends Document {
  key: string
  language: "en" | "am" | "om"
  value: string
  category: string
  createdAt: Date
  updatedAt: Date
}

const translationSchema = new Schema<ITranslation>(
  {
    key: {
      type: String,
      required: true,
      lowercase: true,
    },
    language: {
      type: String,
      enum: ["en", "am", "om"],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "common",
    },
  },
  { timestamps: true },
)

// Compound unique index on key and language
translationSchema.index({ key: 1, language: 1 }, { unique: true })

export default mongoose.model<ITranslation>("Translation", translationSchema)
