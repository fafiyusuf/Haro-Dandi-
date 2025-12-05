import mongoose, { type Document, Schema } from "mongoose"
import bcryptjs from "bcryptjs"

export interface IAdmin extends Document {
  email: string
  password: string
  name: string
  role: "super_admin" | "admin"
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  { timestamps: true },
)

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
adminSchema.methods.comparePassword = async function (password: string) {
  return bcryptjs.compare(password, this.password)
}

export default mongoose.model<IAdmin>("Admin", adminSchema)
