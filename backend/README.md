# Haro Dandi Backend API

Express.js backend for Haro Dandi Hotel & Tourism website with MongoDB database.

## Setup

### Prerequisites
- Node.js 18+
- MongoDB 6+

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file from `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Configure environment variables in `.env`

### Running the Server

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Build for production:
\`\`\`bash
npm run build
npm start
\`\`\`

### Docker

Build and run with Docker:
\`\`\`bash
docker build -t haro-dandi-backend .
docker run -p 5000:5000 --env-file .env haro-dandi-backend
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/auth/logout` - Logout

### Content Management
- `GET /api/pages` - Get published pages
- `GET /api/pages/:slug` - Get page by slug
- `POST /api/pages` - Create page (admin)
- `PUT /api/pages/:id` - Update page (admin)
- `DELETE /api/pages/:id` - Delete page (admin)

### Hotels
- `GET /api/hotels` - Get published hotels
- `GET /api/hotels/:slug` - Get hotel by slug
- `POST /api/hotels` - Create hotel (admin)
- `PUT /api/hotels/:id` - Update hotel (admin)
- `DELETE /api/hotels/:id` - Delete hotel (admin)

### Tours
- `GET /api/tours` - Get published tours
- `GET /api/tours/:slug` - Get tour by slug
- `POST /api/tours` - Create tour (admin)
- `PUT /api/tours/:id` - Update tour (admin)
- `DELETE /api/tours/:id` - Delete tour (admin)

### Gallery
- `GET /api/gallery` - Get gallery images
- `GET /api/gallery?category=hotel` - Filter by category
- `POST /api/gallery` - Add image (admin)
- `PUT /api/gallery/:id` - Update image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get messages (admin)
- `PATCH /api/contact/:id/read` - Mark as read (admin)
- `DELETE /api/contact/:id` - Delete message (admin)

### Translations
- `GET /api/translations/:language` - Get translations
- `POST /api/translations` - Create translation (admin)
- `PUT /api/translations/:id` - Update translation (admin)
- `DELETE /api/translations/:id` - Delete translation (admin)

## Seeding Database

See `/seeds` folder for sample data to populate the database.

## Testing

Run tests:
\`\`\`bash
npm test
npm run test:watch
