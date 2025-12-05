# Setup & Installation Guide

## Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- MongoDB 6.0 or higher
- Git

## Local Development Setup

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/harodandi/website.git
cd website
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env
\`\`\`

**Required environment variables:**
\`\`\`
MONGODB_URI=mongodb://localhost:27017/haro-dandi
MONGO_DB_NAME=haro-dandi
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

**Optional environment variables (for email):**
\`\`\`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@harodandi.com
\`\`\`

### 3. MongoDB Setup

**Option A: Local MongoDB**
\`\`\`bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
\`\`\`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Use as MONGODB_URI in .env

### 4. Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
\`\`\`

### 5. Run Development Servers

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
# Runs on http://localhost:5000
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
# Runs on http://localhost:3000
\`\`\`

### 6. Seed Database (Optional)

\`\`\`bash
cd backend
npm run seed
\`\`\`

This will create:
- Sample admin user
- Sample pages
- Sample hotels
- Sample tours
- Sample gallery images
- Sample translations

**Demo Admin Credentials:**
- Email: admin@harodandi.com
- Password: Admin@1234

## Database Models

Run `npm run migrate` to set up database indexes (if implemented).

## Testing

### Run Tests
\`\`\`bash
cd backend
npm test

# Watch mode
npm run test:watch
\`\`\`

## Troubleshooting

### MongoDB Connection Error
\`\`\`
MongooseError: Cannot connect to MongoDB
\`\`\`
- Ensure MongoDB is running: `brew services list`
- Check MONGODB_URI in .env
- Verify database is accessible: `mongo --eval "db.adminCommand('ping')"`

### Port Already in Use
\`\`\`
Error: listen EADDRINUSE: address already in use :::5000
\`\`\`
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### CORS Errors
- Check FRONTEND_URL matches your frontend URL
- Ensure CORS headers are set correctly in Express

### Email Not Sending
- Verify SMTP credentials
- Check spam folder
- Enable "Less secure app access" for Gmail

## Next Steps

1. Review [API.md](./API.md) for API documentation
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
3. See [ASSUMPTIONS.md](./ASSUMPTIONS.md) for design decisions
