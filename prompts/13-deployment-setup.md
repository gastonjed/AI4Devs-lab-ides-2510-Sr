# Prompt: Deployment Setup

## Objective
Prepare the application for production deployment with proper configuration, security, and documentation.

## Context
- **Application**: Full-stack candidate management system
- **Components**: React frontend, Express backend, PostgreSQL database
- **Deployment Target**: Production server or cloud platform

## Requirements

### 1. Environment Configuration

**Backend `.env` File**:
- [ ] `DATABASE_URL` - Production database connection string
- [ ] `PORT` - Server port (default: 3010)
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN` - Frontend production URL
- [ ] `MAX_FILE_SIZE` - File upload limit (bytes)
- [ ] `UPLOAD_DIR` - Upload directory path

**Frontend `.env` File**:
- [ ] `REACT_APP_API_URL` - Backend API URL
- [ ] `REACT_APP_MAX_FILE_SIZE` - File size limit (for display)

**Security**:
- [ ] Add `.env` to `.gitignore`
- [ ] Never commit secrets to Git
- [ ] Use environment variables for all sensitive data

### 2. Database Setup

**Production Database**:
- [ ] Create production PostgreSQL database
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Verify database connection
- [ ] Set up database backups
- [ ] Configure connection pooling (if needed)

### 3. File Upload Directory

**Setup**:
- [ ] Create `uploads/candidates/` directory on server
- [ ] Set proper permissions: `chmod 755 uploads/`
- [ ] Ensure directory is writable by application
- [ ] Configure backup for uploaded files
- [ ] Add `.gitkeep` to preserve directory structure

**Security**:
- [ ] Uploads directory NOT in public web root
- [ ] No execute permissions on uploaded files
- [ ] Consider moving to cloud storage (S3, Azure Blob) for scale

### 4. Backend Build and Start

**Build**:
```bash
cd backend
npm run build
```

**Start Production**:
```bash
npm start
```

**Process Manager** (Recommended):
- Use PM2 for process management
- `pm2 start dist/index.js --name ats-backend`
- `pm2 startup` - Auto-restart on server reboot

### 5. Frontend Build

**Build**:
```bash
cd frontend
npm run build
```

**Output**: `frontend/build/` directory with static files

**Deployment Options**:
- **Option A**: Serve from Express backend (add static middleware)
- **Option B**: Deploy to Netlify/Vercel
- **Option C**: Serve with Nginx

### 6. Security Checklist

**Backend**:
- [ ] Enable CORS only for trusted origins
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add helmet.js for security headers
- [ ] Validate and sanitize all inputs
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated

**Frontend**:
- [ ] Remove console.logs from production
- [ ] Enable React production mode
- [ ] Minify assets
- [ ] Use HTTPS

### 7. Performance Optimization

**Backend**:
- [ ] Enable gzip compression
- [ ] Optimize database queries (add indexes)
- [ ] Connection pooling for Prisma
- [ ] Caching strategy (if needed)

**Frontend**:
- [ ] Code splitting
- [ ] Lazy loading components
- [ ] Optimize images
- [ ] Browser caching headers

### 8. Monitoring and Logging

**Setup**:
- [ ] Application logging (Winston or similar)
- [ ] Error tracking (Sentry or similar)
- [ ] Performance monitoring
- [ ] Database query monitoring
- [ ] Disk space monitoring (for uploads)

**Log Levels**:
- Production: ERROR, WARN
- Development: DEBUG, INFO, ERROR, WARN

### 9. Documentation

**Create/Update**:
- [ ] `README.md` - Setup instructions, architecture overview
- [ ] `DEPLOYMENT.md` - Deployment steps and requirements
- [ ] `API.md` - API documentation (or use Swagger)
- [ ] `CONTRIBUTING.md` - Development guidelines
- [ ] Environment variable examples (`.env.example`)

**README Sections**:
- Project description
- Features
- Tech stack
- Prerequisites
- Installation steps
- Running locally
- Running tests
- Deployment
- API documentation link
- License

### 10. Health Check Endpoint

**Add to Backend**:
```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

**Purpose**: Monitor application status

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (backend and frontend)
- [ ] Code reviewed and merged to main branch
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Build process tested locally

### Deployment
- [ ] Create production database
- [ ] Run database migrations
- [ ] Create upload directory with permissions
- [ ] Build backend: `npm run build`
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend (start with process manager)
- [ ] Deploy frontend (static hosting or serve from backend)
- [ ] Configure reverse proxy (Nginx) if needed
- [ ] Set up SSL certificate (Let's Encrypt)

### Post-Deployment
- [ ] Verify application is accessible
- [ ] Test form submission end-to-end
- [ ] Test file upload functionality
- [ ] Check logs for errors
- [ ] Monitor performance
- [ ] Set up automated backups
- [ ] Document deployment process

## Production Best Practices

1. **Never run as root**: Use dedicated user account
2. **Use process manager**: PM2 or systemd
3. **Enable monitoring**: Set up alerts for errors/downtime
4. **Regular backups**: Database + uploaded files
5. **Keep updated**: Regularly update dependencies
6. **Use HTTPS**: Always in production
7. **Rate limiting**: Prevent abuse
8. **Log rotation**: Prevent disk space issues

## Rollback Plan

**If deployment fails**:
1. Keep previous build available
2. Database migration rollback plan
3. Quick revert process documented
4. Backup restoration procedure tested

## Expected Outcome

- Application running in production
- All features working correctly
- Secure configuration
- Monitoring in place
- Documentation complete
- Backup strategy implemented

---

**Congratulations!** You've completed all implementation prompts for the candidate management feature.
