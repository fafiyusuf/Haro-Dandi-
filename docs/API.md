# Haro Dandi API Documentation

## Base URL
- Development: `http://localhost:5000`
- Production: `https://api.harodandi.com` (example)

## Authentication

Most endpoints require JWT authentication. Include token in request header:
\`\`\`
Authorization: Bearer {token}
\`\`\`

## Auth Endpoints

### Login
\`\`\`
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@harodandi.com",
  "password": "Admin@1234"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "email": "admin@harodandi.com",
    "name": "Admin User",
    "role": "admin"
  }
}
\`\`\`

### Get Current Admin
\`\`\`
GET /api/auth/me
Authorization: Bearer {token}

Response (200):
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0",
  "email": "admin@harodandi.com",
  "name": "Admin User",
  "role": "admin",
  "lastLogin": "2024-01-15T10:30:00Z"
}
\`\`\`

## Pages Endpoints

### Get All Pages (Public)
\`\`\`
GET /api/pages

Response (200):
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "slug": "about",
    "title": "About Us",
    "contents": [
      {
        "language": "en",
        "title": "About Us",
        "content": "..."
      }
    ],
    "isPublished": true
  }
]
\`\`\`

### Get Page by Slug (Public)
\`\`\`
GET /api/pages/about

Response (200):
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0",
  "slug": "about",
  "title": "About Us",
  "contents": [...],
  "isPublished": true
}
\`\`\`

### Create Page (Admin)
\`\`\`
POST /api/pages
Authorization: Bearer {token}
Content-Type: application/json

{
  "slug": "services",
  "title": "Services",
  "contents": [
    {
      "language": "en",
      "title": "Our Services",
      "content": "..."
    }
  ],
  "isPublished": true
}

Response (201):
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0",
  "slug": "services",
  ...
}
\`\`\`

## Hotels Endpoints

### Get All Hotels (Public)
\`\`\`
GET /api/hotels

Response (200):
[
  {
    "_id": "...",
    "slug": "addis-hotel",
    "location": "Addis Ababa",
    "pricePerNight": 150,
    "images": ["url1", "url2"],
    "contents": [...]
  }
]
\`\`\`

### Get Hotel by Slug (Public)
\`\`\`
GET /api/hotels/addis-hotel
\`\`\`

### Create Hotel (Admin)
\`\`\`
POST /api/hotels
Authorization: Bearer {token}

{
  "slug": "addis-hotel",
  "location": "Addis Ababa",
  "pricePerNight": 150,
  "images": ["https://..."],
  "contents": [
    {
      "language": "en",
      "name": "Addis Hotel",
      "description": "...",
      "amenities": ["WiFi", "Parking", "Pool"]
    }
  ],
  "isPublished": true
}
\`\`\`

## Tours Endpoints

### Get All Tours (Public)
\`\`\`
GET /api/tours
\`\`\`

### Create Tour (Admin)
\`\`\`
POST /api/tours
Authorization: Bearer {token}

{
  "slug": "addis-tour",
  "destination": "Addis Ababa",
  "duration": 3,
  "pricePerPerson": 250,
  "groupSize": {"min": 2, "max": 10},
  "images": ["https://..."],
  "contents": [
    {
      "language": "en",
      "title": "Addis City Tour",
      "description": "...",
      "itinerary": ["Day 1: ...", "Day 2: ..."]
    }
  ]
}
\`\`\`

## Gallery Endpoints

### Get Gallery Images (Public)
\`\`\`
GET /api/gallery
GET /api/gallery?category=hotel
\`\`\`

### Create Gallery Image (Admin)
\`\`\`
POST /api/gallery
Authorization: Bearer {token}

{
  "url": "https://...",
  "title": "Hotel Lobby",
  "category": "hotel",
  "order": 0
}
\`\`\`

## Contact Endpoints

### Submit Contact Form (Public)
\`\`\`
POST /api/contact

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+251912345678",
  "subject": "Reservation Inquiry",
  "message": "I would like to book a room for..."
}

Response (201):
{
  "message": "Message received. Thank you for contacting us!",
  "data": {
    "_id": "...",
    ...
  }
}
\`\`\`

### Get Messages (Admin)
\`\`\`
GET /api/contact
Authorization: Bearer {token}
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "errors": [
    {
      "value": "invalid@email",
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "message": "Access token required"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "message": "Resource not found"
}
\`\`\`

### 500 Server Error
\`\`\`json
{
  "error": {
    "status": 500,
    "message": "Internal Server Error"
  }
}
\`\`\`

## Rate Limiting

No rate limiting implemented in current version. Consider adding for production.

## CORS

Configured to allow requests from `FRONTEND_URL` environment variable.
