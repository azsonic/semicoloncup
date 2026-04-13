# 🎨 Intive Tile Quick Reference Card

## Copy-Paste Ready Examples

### 1. Stat Card (Dashboard KPIs)
```tsx
import { IntiveStatCard } from '@/app/components/IntiveTile';
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

<IntiveStatCard
  icon={<Trophy />}
  label="Your Points"
  value="247"
  subtitle="Rank #12"
  color="blue"
/>
```

**Colors:** `blue` `green` `purple` `yellow` `default`

---

### 2. Generic Tile (Any Content)
```tsx
import { IntiveTile } from '@/app/components/IntiveTile';
import { Users } from 'lucide-react';

<IntiveTile
  icon={<Users />}
  title="Active Users"
  value="1,247"
  subtitle="Last 24 hours"
  variant="primary"
  size="md"
/>
```

**Variants:** `default` `primary` `success` `accent`  
**Sizes:** `sm` `md` `lg`

---

### 3. Feature Tile (Landing Page)
```tsx
import { IntiveFeatureTile } from '@/app/components/IntiveTile';
import { Globe } from 'lucide-react';

<IntiveFeatureTile
  icon={<Globe />}
  title="Office Battle Map"
  description="Compete with intive offices worldwide..."
/>
```

---

## Intive Brand Colors

```css
Blue:   #0066CC  /* Primary - CTAs, links */
Green:  #00D68F  /* Accent - Success */
Black:  #1a1a1a  /* Background */
Gray:   #333333  /* Borders */
White:  #FFFFFF  /* Text, icons */
```

---

## Grid Layouts

### 4-Column (Dashboard Stats)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <IntiveStatCard {...} />
  <IntiveStatCard {...} />
  <IntiveStatCard {...} />
  <IntiveStatCard {...} />
</div>
```

### 3-Column (Features)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <IntiveFeatureTile {...} />
  <IntiveFeatureTile {...} />
  <IntiveFeatureTile {...} />
</div>
```

---

## Custom Content Example
```tsx
<IntiveTile
  icon={<MapPin />}
  title="Global Offices"
  variant="accent"
  size="lg"
>
  <div className="mt-4 grid grid-cols-3 gap-4">
    <div className="bg-white/10 rounded-lg p-4">
      <div className="text-2xl font-bold text-white">14</div>
      <div className="text-xs text-gray-400">Countries</div>
    </div>
  </div>
</IntiveTile>
```

---

## URLs
- **Demo:** http://localhost:3001/tiles-demo
- **Dashboard:** http://localhost:3001/dashboard

## Docs
- `INTIVE_BRANDING_GUIDE.md` - Full guide
- `IMPLEMENTATION_SUMMARY.md` - Quick overview
- `VISUAL_CHANGES.md` - Before/after

---

**Made for intive ;cup | 2026**
