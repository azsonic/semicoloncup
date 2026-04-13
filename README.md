# ;cup - intive FIFA 2026 Prediction App

![;cup Logo](https://img.shields.io/badge/%3Bcup-intive-10b981?style=for-the-badge)

A stunning, interactive FIFA World Cup 2026 prediction game built for **intive**'s global team. Compete with colleagues, represent your office, and predict your way to glory!

## 🎯 Project Overview

**;cup** (pronounced "semicolon cup") is a gamified prediction platform where intive employees across 9 offices worldwide compete to become the ultimate football oracle. The semicolon (`;`) represents intive's coding DNA, while "cup" celebrates the FIFA World Cup.

**Target Audience:** intive management (for budget/buy-in approval)  
**Type:** Hybrid demo with fully working frontend + backend-ready architecture  
**Timeline:** ASAP prototype  

## ✨ Key Features

### 🏆 The "WOW" Factor: Office Battle Map
An interactive world map showing intive offices competing in real-time with pulsing animations, rankings, and global leaderboards. **This is the centerpiece that will impress management.**

### 7 Core Screens

1. **Landing Page** - Stunning hero with countdown, ;cup branding, and feature showcase
2. **Onboarding** - Kahoot-style interactive flow (fun quiz, office selection, rules)
3. **Dashboard** - Main hub with upcoming matches, stats cards, badges, and office standing
4. **Match Prediction** - Interactive score selector with bonus questions (+1pt each)
5. **Leaderboard** - Office Battle Map + global rankings with live updates
6. **Fun Stats** - Analytics: Most Optimistic, Country Bias Detector, Upset King, etc.
7. **Live Match** - Stadium atmosphere with real-time scores, leaderboard shifts, celebration effects

### 🎮 Gamification

- **Points System:** 5pts (exact score), 2pts (correct outcome), 1pt (bonus questions)
- **Badges:** Oracle, Hot Streak, Upset King, Early Bird, etc.
- **Streaks:** Track consecutive correct predictions
- **Office Battle:** Offices compete for the top spot
- **Real-time Updates:** Live match experience with WebSocket-ready architecture

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date Handling:** date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
cd semicoloncup
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
semicoloncup/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── onboarding/              # Kahoot-style onboarding
│   ├── dashboard/               # Main hub
│   ├── predict/[id]/            # Match prediction
│   ├── leaderboard/             # Office Battle Map
│   ├── stats/                   # Fun analytics
│   ├── live/                    # Live match experience
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + intive branding
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── mock-data.ts             # Mock FIFA 2026 data
│   └── utils.ts                 # Shared utilities
└── package.json
\`\`\`

## 🎨 Design System

### Colors

- **intive Gray:** `#555550` (primary brand color)
- **Pitch Green:** `#10b981` (football field accent)
- **Trophy Gold:** `#fbbf24` (winner/achievement accent)
- **Stadium Blue:** `#3b82f6` (secondary accent)
- **Background:** Dark theme (`#0a0a0a` → `#555550` gradient)

### Typography

- **Primary Font:** Geist Sans (modern, clean)
- **Monospace:** Geist Mono (for stats and data)

### Accessibility

- **WCAG AA compliant** from the start
- Semantic HTML throughout
- Keyboard navigation support
- Color contrast > 4.5:1
- ARIA labels on interactive elements

## 🌍 intive Offices

The app features **9 intive offices** competing globally:

| Office | Country | Employees | Flag |
|--------|---------|-----------|------|
| Kraków | Poland | 450 | 🇵🇱 |
| München | Germany | 380 | 🇩🇪 |
| Buenos Aires | Argentina | 320 | 🇦🇷 |
| Szczecin | Poland | 280 | 🇵🇱 |
| Wrocław | Poland | 220 | 🇵🇱 |
| Ahmedabad | India | 200 | 🇮🇳 |
| Bucharest | Romania | 180 | 🇷🇴 |
| Tampere | Finland | 150 | 🇫🇮 |
| Dublin | Ireland | 120 | 🇮🇪 |

## 🔮 Future Enhancements (Post-Prototype)

### Backend Integration
- **Database:** PostgreSQL or Azure Cosmos DB
- **Auth:** Microsoft Entra ID (SSO)
- **API:** RESTful or GraphQL
- **Real-time:** WebSockets for live updates

### Data Source
- **football-data.org API** (World Cup in free tier)
- Live scores: €12-29/month during tournament
- Pre-seed schedule, use API for results

### Notifications
- **Microsoft Teams integration** (intive likely uses Teams)
- Match reminders, goal alerts, leaderboard updates

### Analytics
- PostHog or Mixpanel for user behavior
- Track engagement, prediction patterns, office performance

### Deployment
- **Azure** (fits Microsoft ecosystem)
- **Vercel** (fastest for Next.js)
- **Cloudflare Workers** (edge deployment)

## 📊 Mock Data Included

The prototype includes realistic mock data for:

- **8 sample FIFA 2026 matches** (opening match: Mexico vs South Africa, June 11, 2026)
- **48 teams** across 12 groups
- **3 sample users** with predictions, badges, and stats
- **6 fun stats** (Most Optimistic, Upset King, Oracle, etc.)
- **Office performance data** with realistic point distributions

*Note: Full 104-match dataset would be included in production version*

## 🎯 Points System

| Prediction Type | Points |
|----------------|--------|
| Exact score | 5 pts |
| Correct outcome | 2 pts |
| Goal difference | +1 pt |
| First goal time | +1 pt |
| Total goals over/under | +1 pt |
| Both teams score | +1 pt |
| **Tournament predictions:** | |
| World Cup winner | 20 pts |
| Finalist | 10 pts |
| Golden Boot | 10 pts |
| Group winner | 5 pts each |
| Dark Horse (outside top 10 → QF) | 15 pts |

## 🎨 Brand Integration

The app seamlessly blends **intive's brand identity** with football aesthetics:

- `;` (semicolon) from intive's logo = coding DNA
- Wolf emblem inspiration (intive's logo animal)
- "Never settle" tagline integration
- intive gray + pitch green color harmony
- Professional yet playful tone

## 📱 Responsive Design

- **Desktop-first** with full mobile optimization
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Touch-friendly interactions
- Optimized animations for mobile performance

## 🔐 Security & Privacy (For Production)

- No passwords stored (Microsoft Entra ID SSO)
- HTTPS only
- CSRF protection
- Rate limiting on predictions
- Anti-cheating measures (prediction locks 1h before kickoff)

## 🏃‍♂️ Performance

- **Lighthouse Score Target:** 95+ on all metrics
- Code splitting via Next.js App Router
- Lazy loading for images and heavy components
- Optimized bundle size
- Turbopack for ultra-fast dev mode

## 📈 Success Metrics (For Management Pitch)

- **Engagement:** % of employees who join and predict
- **Retention:** Weekly active users throughout tournament
- **Office Battle:** Which office dominates? (creates healthy competition)
- **Social Impact:** Teams channel activity, water cooler moments
- **Brand Building:** Showcases intive's technical capabilities internally

## 🎬 Demo Flow (For Presentation)

1. **Landing Page** - Show countdown, branding, CTA
2. **Onboarding** - Quick Kahoot-style flow (< 30 seconds)
3. **Dashboard** - Overview of features, live match alert
4. **Match Prediction** - Interactive prediction UI
5. **Office Battle Map** - **WOW MOMENT** - Show global competition
6. **Fun Stats** - Analytics and gamification
7. **Live Match** - Stadium atmosphere in action

## 🤝 Contributing (For Development Team)

This is a prototype. To extend it:

1. Replace mock data with real API calls
2. Implement authentication (Microsoft Entra ID)
3. Add database persistence (Prisma + PostgreSQL)
4. Set up WebSocket server for real-time updates
5. Deploy to Azure or Vercel
6. Add monitoring (Sentry, LogRocket)

## 📄 License

Proprietary - © 2026 intive. Built for internal use.

## 🙏 Acknowledgments

- **FIFA 2026** tournament data
- **intive** brand guidelines
- **Next.js** team for the amazing framework
- **Framer Motion** for smooth animations

---

**Built with 💚 by intive for intive**

For questions or demo requests, contact the PreSales team.

---

## Quick Commands

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

**Ready to predict? Let the games begin! ⚽**
