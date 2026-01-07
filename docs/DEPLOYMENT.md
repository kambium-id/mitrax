# Deployment Guide

## Deployment Options

Mitrax dashboard dapat di-deploy ke berbagai platform. Berikut adalah panduan untuk beberapa opsi populer.

## 🚀 Vercel (Recommended)

Vercel adalah platform deployment resmi untuk Next.js dengan zero-configuration.

### Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- Git repository di GitHub/GitLab/Bitbucket

### Deployment Steps

#### Option 1: Import from Git (Recommended)

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select `kambium-id/mitrax` repository
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Environment Variables**
   
   Add di Vercel dashboard:
   ```
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/logistics-chat
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Access your app at `https://mitrax.vercel.app`

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd ~/mitrax
vercel

# Follow prompts:
# ? Set up and deploy? Y
# ? Which scope? Your account
# ? Link to existing project? N
# ? What's your project's name? mitrax
# ? In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to Vercel dashboard → Project Settings → Domains
2. Add custom domain (e.g., `dashboard.mitrax.com`)
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

### Auto-Deploy

Setiap push ke branch `main` akan otomatis trigger deployment baru.

---

## 🐳 Docker Deployment

### Prerequisites

- Docker installed
- Docker Hub account (optional)

### Build Docker Image

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create `.dockerignore`:

```
node_modules
.next
.git
.env.local
docs
README.md
```

### Build and Run

```bash
# Build image
docker build -t mitrax-dashboard .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook \
  mitrax-dashboard

# Or use docker-compose
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mitrax:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_N8N_WEBHOOK_URL=${N8N_WEBHOOK_URL}
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## ☁️ VPS Deployment (Ubuntu/Debian)

### Prerequisites

- VPS dengan Ubuntu 20.04+ atau Debian 11+
- Root atau sudo access
- Domain name (optional)

### Installation Steps

#### 1. Install Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

#### 2. Install PM2

```bash
sudo npm install -g pm2
```

#### 3. Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/kambium-id/mitrax.git
cd mitrax
```

#### 4. Install Dependencies

```bash
sudo npm install
```

#### 5. Create Environment File

```bash
sudo nano .env.local
```

Add:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/logistics-chat
```

#### 6. Build Application

```bash
sudo npm run build
```

#### 7. Start with PM2

```bash
sudo pm2 start npm --name "mitrax" -- start
sudo pm2 save
sudo pm2 startup
```

#### 8. Configure Nginx (Optional but Recommended)

```bash
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/mitrax
```

Add:
```nginx
server {
    listen 80;
    server_name dashboard.mitrax.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/mitrax /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 9. SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d dashboard.mitrax.com
```

### Update Deployment

```bash
cd /var/www/mitrax
sudo git pull
sudo npm install
sudo npm run build
sudo pm2 restart mitrax
```

---

## 📊 Environment Variables

### Required

```env
# n8n Integration (Optional but recommended)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/logistics-chat
```

### Optional

```env
# Analytics (if using Google Analytics)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# API Base URL (if using backend API)
NEXT_PUBLIC_API_URL=https://api.mitrax.com
```

---

## 🔍 Health Check

After deployment, verify:

1. **Homepage loads**: `https://your-domain.com`
2. **Metrics display**: Cards show data
3. **Chart renders**: Analytics visualization works
4. **Chat interface**: AI assistant is functional
5. **Responsive**: Test on mobile/tablet
6. **Console errors**: Check browser console

### Test Endpoints

```bash
# Homepage
curl -I https://your-domain.com

# Should return 200 OK
```

---

## 🔄 CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.N8N_WEBHOOK_URL }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 📋 Pre-Deployment Checklist

- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] n8n webhook URL is valid (if using AI chat)
- [ ] Domain DNS configured (if using custom domain)
- [ ] SSL certificate ready (for production)
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Analytics configured (GA, etc.)
- [ ] Performance tested
- [ ] Security headers configured

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Environment Variables Not Loading

- Ensure `.env.local` exists (for local)
- Prefix client variables with `NEXT_PUBLIC_`
- Restart server after changes

### Nginx 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Restart app
pm2 restart mitrax

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

**For additional support, contact Kambium ID team or create an issue on GitHub.**
