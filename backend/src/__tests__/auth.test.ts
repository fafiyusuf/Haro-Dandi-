import { describe, it, expect, beforeAll, afterAll } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../index.js"
import Admin from "../models/Admin.js"

describe("Auth Routes", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/haro-dandi-test")
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it("should login with valid credentials", async () => {
    // Create test admin
    const admin = new Admin({
      email: "admin@test.com",
      password: "Test@1234",
      name: "Test Admin",
      role: "admin",
    })
    await admin.save()

    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "Test@1234",
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
  })

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "invalid@test.com",
      password: "invalid",
    })

    expect(response.status).toBe(401)
  })
})
