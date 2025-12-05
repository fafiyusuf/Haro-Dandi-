# Assumptions & Design Decisions

## Inferred Requirements

### 1. Admin Authentication
**Assumption**: Single admin role or basic admin/super-admin distinction
**Decision**: Implemented admin and super_admin roles with JWT authentication for security

### 2. Multi-language Implementation
**Assumption**: Core functionality in 3 languages (English, Amharic, Afaan Oromo)
**Decision**: Used i18next with client-side language switching and server-side content storage

### 3. Content Management
**Assumption**: Need for dynamic content without complex versioning
**Decision**: Simple CRUD operations with is_published flag for draft/live control

### 4. Image Handling
**Assumption**: Images managed externally (URLs stored, not uploaded)
**Decision**: Store image URLs, allow admin to paste URLs from cloud storage

### 5. Email Notifications
**Assumption**: Contact form submissions should notify admin
**Decision**: Used nodemailer for SMTP email notifications

### 6. Mobile Responsiveness
**Assumption**: Website needs to work on all devices
**Decision**: Mobile-first design using Tailwind CSS with responsive utilities

### 7. SEO
**Assumption**: Basic SEO support needed
**Decision**: Added meta tags, sitemap support, semantic HTML structure

### 8. Performance
**Assumption**: Site serves global audience with varying connection speeds
**Decision**: Implemented image lazy loading, API pagination (if needed), cache headers

## Technology Choices

### Frontend: Next.js 15
- Server-side rendering for better SEO
- API routes for rapid development
- Built-in image optimization
- Native support for ISR (Incremental Static Regeneration)

### Backend: Express.js
- Lightweight and flexible
- Mature ecosystem
- Easy JWT implementation
- Good performance

### Database: MongoDB
- Flexible schema for multi-language content
- Good scaling options
- Native JSON support
- Atlas cloud option

### State Management: Zustand
- Lightweight alternative to Redux
- Easy to learn and use
- Minimal boilerplate
- Good TypeScript support

## Not Implemented (Out of Scope)

1. **Booking System**: Specified as not required
2. **Payment Processing**: Specified as not required
3. **User Accounts**: Focus on admin and public access
4. **Real-time Features**: Standard HTTP communication sufficient
5. **Advanced Analytics**: Beyond basic page views
6. **Blog System**: Not mentioned in requirements

## Future Enhancements

1. Add image upload to backend
2. Implement booking system
3. Add user reviews and ratings
4. Implement advanced search
5. Add social media integration
6. Create mobile app
7. Add video content
8. Implement reservation system

## Security Considerations

- Passwords hashed with bcryptjs
- JWT tokens with expiration
- Input validation on all routes
- SQL injection prevention (using Mongoose)
- CORS configured
- Helmet.js for HTTP headers
- Rate limiting recommended for production

## Scalability Notes

- Database indexes on frequently queried fields
- API pagination ready for implementation
- Stateless backend for horizontal scaling
- CDN recommended for static assets
- Consider caching layer (Redis) for production
