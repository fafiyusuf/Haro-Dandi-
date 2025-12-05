# Deployment Guide

## Production Checklist

- [ ] Update JWT_SECRET to strong random string
- [ ] Update admin credentials
- [ ] Configure production MongoDB
- [ ] Set up email service
- [ ] Configure domain/SSL
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Backup database regularly

## Backend Deployment

### Docker Deployment

\`\`\`bash
cd backend

# Build image
docker build -t haro-dandi-backend:latest .

# Run container
docker run -d \
  -p 5000:5000 \
  --env-file .env.production \
  --name haro-dandi-api \
  haro-dandi-backend:latest

# View logs
docker logs -f haro-dandi-api
\`\`\`

### Railway Deployment

1. Push code to GitHub
2. Go to https://railway.app
3. Create new project → GitHub repo
4. Add environment variables
5. Deploy

### Render Deployment

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Manual VPS Deployment

\`\`\`bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone https://github.com/harodandi/website.git
cd website/backend

# Install dependencies
npm install --production

# Build
npm run build

# Create systemd service
sudo nano /etc/systemd/system/haro-dandi.service
\`\`\`

**Service file content:**
\`\`\`ini
[Unit]
Description=Haro Dandi API
After=network.target

[Service]
Type=simple
User=app-user
WorkingDirectory=/app/backend
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment="NODE_ENV=production"
EnvironmentFile=/app/.env.production

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
# Start service
sudo systemctl start haro-dandi
sudo systemctl enable haro-dandi

# View logs
sudo journalctl -u haro-dandi -f
\`\`\`

## Frontend Deployment

### Vercel (Recommended)

1. Create account at https://vercel.com
2. Import GitHub repository
3. Select `frontend` directory
4. Add environment variables
5. Deploy

Environment variables needed:
\`\`\`
NEXT_PUBLIC_API_URL=https://api.harodandi.com
\`\`\`

### Netlify

1. Connect GitHub repository
2. Set build directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy

### Manual Static Build

\`\`\`bash
cd frontend
npm run build

# Deploy .next folder to static hosting
# (AWS S3, Cloudflare Pages, etc.)
\`\`\`

## SSL/HTTPS

### Let's Encrypt (Nginx)

\`\`\`bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.harodandi.com
sudo nano /etc/nginx/sites-available/api.harodandi.com
\`\`\`

Add SSL configuration to Nginx.

### Cloudflare

1. Add domain to Cloudflare
2. Enable SSL/TLS
3. Set to "Full" or "Full (strict)"

## Environment Variables - Production

**Backend:**
\`\`\`
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/haro-dandi
JWT_SECRET=<generate-random-64-char-string>
PORT=5000
FRONTEND_URL=https://harodandi.com
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=<sendgrid-api-key>
ADMIN_EMAIL=admin@harodandi.com
\`\`\`

**Frontend:**
\`\`\`
NEXT_PUBLIC_API_URL=https://api.harodandi.com
\`\`\`

## Monitoring & Logs

### Application Monitoring
- Set up error tracking (Sentry, Rollbar)
- Monitor API response times
- Track database performance
- Set up alerts

### Log Management
- Forward logs to centralized service (ELK, Datadog)
- Regularly review error logs
- Archive old logs

## Database Backups

### MongoDB Atlas
Automated daily backups enabled by default.

### Manual Backup
\`\`\`bash
# Backup
mongodump --uri="mongodb+srv://user:pass@cluster" -o backup/

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster" backup/
\`\`\`

## Performance Optimization

- Enable caching headers
- Use CDN for static assets
- Optimize database queries
- Implement rate limiting
- Use pagination for large datasets

## Security

- Keep dependencies updated
- Regular security audits
- Use strong passwords
- Enable 2FA for admin panel
- Regular database backups
- Monitor access logs
