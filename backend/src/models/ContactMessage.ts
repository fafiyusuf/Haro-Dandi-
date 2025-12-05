import mongoose, { type Document, Schema } from "mongoose"

export interface IContactMessage extends Document {
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

const contactMessageSchema = new Schema<IContactMessage>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: String,
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isResponded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IContactMessage>("ContactMessage", contactMessageSchema)
