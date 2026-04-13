# ;cup Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended for Demo)

**Fastest way to get ;cup live for the management presentation.**

1. **Prerequisites:**
   - GitHub account
   - Vercel account (free tier works perfectly)

2. **Steps:**
   ```bash
   # 1. Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit: ;cup FIFA 2026 prediction app"
   
   # 2. Push to GitHub
   gh repo create semicoloncup --public --source=. --push
   
   # Or manually:
   # - Create new repo on github.com
   # - git remote add origin <your-repo-url>
   # - git push -u origin main
   
   # 3. Import to Vercel
   # - Go to vercel.com
   # - Click "Import Project"
   # - Select your GitHub repo
   # - Click "Deploy"
   ```

3. **Result:**
   - Live URL in ~2 minutes: `https://semicoloncup-abc123.vercel.app`
   - Auto-deploys on every push to main
   - Free SSL, global CDN, instant rollbacks

4. **Custom Domain (Optional):**
   - Add `cup.intive.com` or similar in Vercel dashboard
   - Update DNS records as instructed

---

### Option 2: Azure (For Production)

**Best fit for intive's Microsoft ecosystem + future Microsoft Entra ID integration.**

#### Prerequisites:
- Azure account
- Azure CLI installed: `az --version`

#### Deployment Steps:

```bash
# 1. Login to Azure
az login

# 2. Create Resource Group
az group create \
  --name semicoloncup-rg \
  --location westeurope

# 3. Create App Service Plan
az appservice plan create \
  --name semicoloncup-plan \
  --resource-group semicoloncup-rg \
  --sku B1 \
  --is-linux

# 4. Create Web App
az webapp create \
  --name semicoloncup \
  --resource-group semicoloncup-rg \
  --plan semicoloncup-plan \
  --runtime "NODE:20-lts"

# 5. Configure deployment from GitHub
az webapp deployment source config \
  --name semicoloncup \
  --resource-group semicoloncup-rg \
  --repo-url https://github.com/<your-username>/semicoloncup \
  --branch main \
  --manual-integration

# 6. Set environment variables
az webapp config appsettings set \
  --name semicoloncup \
  --resource-group semicoloncup-rg \
  --settings \
    NODE_ENV=production \
    WEBSITE_NODE_DEFAULT_VERSION=20.x
```

**Result:**
- Live URL: `https://semicoloncup.azurewebsites.net`
- Cost: ~€12-40/month depending on traffic
- Easy to scale, monitoring built-in

---

### Option 3: Cloudflare Pages (Free + Fast)

**Great CDN, free tier is generous.**

```bash
# 1. Install Cloudflare CLI
npm install -g wrangler

# 2. Login
wrangler login

# 3. Build the app
npm run build

# 4. Deploy
npx wrangler pages deploy .next --project-name semicoloncup
```

**Result:**
- Live URL: `https://semicoloncup.pages.dev`
- Free (unlimited bandwidth!)
- Global edge network

---

### Option 4: Docker (Self-Hosted)

**For intive's internal infrastructure.**

```dockerfile
# Create Dockerfile in project root:
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run:
docker build -t semicoloncup .
docker run -p 3000:3000 semicoloncup

# Or use Docker Compose:
docker-compose up -d
```

---

## Environment Variables

For production deployment, set these (even though prototype doesn't need them yet):

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com  # Future backend
```

---

## Pre-Deployment Checklist

- [ ] Test locally: `npm run build && npm start`
- [ ] Check TypeScript: `npm run lint`
- [ ] Update README with live demo URL
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Safari, Firefox, Edge)
- [ ] Check accessibility (screen reader, keyboard navigation)
- [ ] Verify analytics (if added)
- [ ] Test all navigation flows

---

## Post-Deployment

### 1. Share the Demo
```
Subject: ⚽ ;cup is LIVE - FIFA 2026 Prediction Game

Hi team,

The ;cup prototype is ready for review! 🎉

🔗 Live Demo: https://semicoloncup.vercel.app
📖 Documentation: [Link to README]

Quick Tour:
1. Landing page → Join the Pack
2. Onboarding → Select your office
3. Dashboard → Explore features
4. Leaderboard → See the Office Battle Map (WOW moment!)

This is a fully functional prototype ready for management presentation.

Feedback welcome!
```

### 2. Monitor Performance
- Vercel Analytics (built-in)
- Google Lighthouse audit
- Real user testing

### 3. Iterate Based on Feedback
- Collect feedback from stakeholders
- Prioritize feature requests
- Plan Phase 2 (backend integration)

---

## Cost Estimates

| Platform | Free Tier | Paid (if needed) |
|----------|-----------|------------------|
| **Vercel** | ✓ Perfect for demo | $20/month (Pro) |
| **Cloudflare Pages** | ✓ Generous limits | Free! |
| **Azure** | ✗ | €12-40/month |
| **AWS** | ✗ | $15-50/month |

**Recommendation for Demo:** Vercel (free tier is enough)  
**Recommendation for Production:** Azure (intive ecosystem fit)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Slow Performance
- Enable image optimization in `next.config.js`
- Check bundle size: `npm run build` (look for large chunks)
- Consider lazy loading for heavy components

### TypeScript Errors
```bash
# Check types
npm run type-check

# Fix common issues
# - Missing dependencies: npm install @types/node @types/react
# - Strict mode errors: Adjust tsconfig.json
```

---

## Next Steps (Post-Prototype)

1. **Backend API**
   - Set up PostgreSQL or Cosmos DB
   - Build REST API or GraphQL
   - Implement authentication (Microsoft Entra ID)

2. **Real-time Updates**
   - WebSocket server (Socket.io or Pusher)
   - Live leaderboard updates
   - Match result notifications

3. **Data Integration**
   - football-data.org API subscription
   - Cron job to fetch match results
   - Admin panel for manual overrides

4. **Notifications**
   - Microsoft Teams webhooks
   - Email reminders (SendGrid or similar)
   - Push notifications (OneSignal)

5. **Analytics**
   - PostHog or Mixpanel integration
   - Track engagement metrics
   - A/B testing for features

---

**Ready to deploy? Choose your platform and let's go! 🚀**
