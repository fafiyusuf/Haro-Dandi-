# Haro Dandi Hotel & Tourism Website

A modern, multilingual full-stack web application for Haro Dandi Hotel and Tourism Share Company, built with Next.js, Express, MongoDB, and featuring a comprehensive admin dashboard.

## Project Overview

This is a production-ready tourism and hospitality website with:
- **Frontend**: Next.js 15 with React 19, Tailwind CSS, Zustand state management
- **Backend**: Express.js with MongoDB, JWT authentication
- **Multilingual Support**: English, Amharic, Afaan Oromo
- **Admin Dashboard**: Full CMS for content management
- **Responsive Design**: Mobile-first, accessible interface

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

#### Backend Setup
\`\`\`bash
cd backend
cp .env.example .env
# Configure your MongoDB URI and other environment variables in .env
npm install
npm run dev
\`\`\`

#### Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the API.

## Project Structure

\`\`\`
/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, error handling
│   │   ├── config/         # Configuration
│   │   ├── utils/          # Email service
│   │   └── __tests__/      # API tests
│   ├── .env.example        # Environment variables template
│   └── Dockerfile          # Docker configuration
│
├── frontend/               # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── stores/            # Zustand state management
│   ├── services/          # API client
│   ├── types/             # TypeScript interfaces
│   ├── public/
│   │   └── locales/       # i18n translation files
│   └── globals.css        # Tailwind styles
│
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   ├── SETUP.md          # Setup guide
│   ├── DEPLOYMENT.md     # Deployment guide
│   └── ASSUMPTIONS.md    # Assumptions & inferences
│
└── README.md             # This file
\`\`\`

## Features

### Public Website
- **Home Page**: Hero section with call-to-actions
- **About Page**: Company history, team, stats
- **Vision & Mission**: Strategic objectives and values
- **Hotels & Lodges**: Browsable hotel listings with details
- **Tours**: Tour packages with itineraries
- **Gallery**: Image gallery with lightbox
- **Contact Form**: Customer inquiries with admin notification
- **Multi-language**: Full i18n support

### Admin Dashboard
- **Authentication**: JWT-based login system
- **Pages**: Create/edit/delete website pages
- **Hotels**: Manage hotel listings and details
- **Tours**: Manage tour packages and itineraries
- **Gallery**: Upload and manage gallery images
- **Translations**: Edit multi-language content
- **Messages**: View and manage contact form submissions

### Technical Features
- **RESTful API**: Clean, well-structured endpoints
- **JWT Authentication**: Secure admin access
- **Input Validation**: Server-side validation on all routes
- **Email Notifications**: Admin alerts for contact submissions
- **Multi-language**: Full i18n with language switching
- **Responsive Design**: Mobile-first CSS
- **Error Handling**: Comprehensive error management
- **Database Models**: Type-safe Mongoose schemas

## API Documentation

See [docs/API.md](./docs/API.md) for complete API reference.

### Key Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/hotels` - Get all hotels
- `GET /api/tours` - Get all tours
- `POST /api/contact` - Submit contact form
- `GET /api/translations/:language` - Get translations

## Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/haro-dandi
JWT_SECRET=your_secret_key_here
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@harodandi.com
\`\`\`

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## Admin Credentials (Demo)

**Email**: admin@harodandi.com  
**Password**: Admin@1234

⚠️ Change these credentials in production!

## Development

### Running Tests
\`\`\`bash
cd backend
npm test
npm run test:watch
\`\`\`

### Building for Production
\`\`\`bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
\`\`\`

### Docker Deployment
\`\`\`bash
cd backend
docker build -t haro-dandi-backend .
docker run -p 5000:5000 --env-file .env haro-dandi-backend
\`\`\`

## Database Schema

### Admin
- email (unique)
- password (hashed)
- name
- role (super_admin | admin)
- lastLogin

### Hotel
- slug (unique)
- contents (multilingual)
- location
- pricePerNight
- images
- rating
- isPublished

### Tour
- slug (unique)
- contents (multilingual)
- duration
- pricePerPerson
- destination
- images
- isPublished

### ContactMessage
- firstName
- lastName
- email
- subject
- message
- isRead
- isResponded

See [docs/SCHEMA.md](./docs/SCHEMA.md) for detailed schema documentation.

## Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Railway/Render (Backend)
1. Create new service
2. Connect GitHub repository
3. Add environment variables
4. Deploy

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## Support & Issues

For issues or questions, please:
1. Check existing documentation
2. Review API errors in browser console
3. Check backend logs for detailed error messages
4. Contact support@harodandi.com

## License

All rights reserved © 2025 Haro Dandi Hotel & Tourism SC
