'use client';

import { Trophy, Target, TrendingUp, Calendar, Users, Award, Star, Zap, Globe, MapPin } from 'lucide-react';
import { IntiveTile, IntiveStatCard, IntiveFeatureTile } from '../components/IntiveTile';

export default function TilesDemoPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-[#007fd1]">Intive</span> Design System
          </h1>
          <p className="text-gray-400">
            Dark, professional tile components with geometric patterns
          </p>
        </div>

        {/* Stat Cards Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Stat Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IntiveStatCard
              icon={<Trophy />}
              label="Your Points"
              value="247"
              subtitle="Rank #12 globally"
              color="blue"
            />
            <IntiveStatCard
              icon={<Target />}
              label="Exact Scores"
              value="18"
              subtitle="85% accuracy rate"
              color="green"
            />
            <IntiveStatCard
              icon={<TrendingUp />}
              label="Current Streak"
              value="7"
              subtitle="Best: 12 matches"
              color="purple"
            />
            <IntiveStatCard
              icon={<Calendar />}
              label="Office Rank"
              value="#3"
              subtitle="Kraków Office"
              color="yellow"
            />
          </div>
        </section>

        {/* Feature Tiles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Feature Tiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntiveFeatureTile
              icon={<Globe />}
              title="Office Battle Map"
              description="Compete with intive offices worldwide. Real-time rankings and interactive world map showing global competition."
            />
            <IntiveFeatureTile
              icon={<Award />}
              title="Achievement System"
              description="Unlock badges and achievements. Track your progress with Oracle, Hot Streak, and Upset King badges."
            />
            <IntiveFeatureTile
              icon={<Star />}
              title="Live Match Experience"
              description="Stadium atmosphere with real-time scores, celebration effects, and leaderboard shifts during matches."
            />
          </div>
        </section>

        {/* Generic Tiles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Tile Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Default Tile */}
            <IntiveTile
              icon={<Users />}
              title="Default Tile"
              value="1,247"
              subtitle="Active participants"
              variant="default"
            />

            {/* Primary Tile */}
            <IntiveTile
              icon={<Zap />}
              title="Primary Tile"
              value="89%"
              subtitle="Engagement rate"
              variant="primary"
            />

            {/* Success Tile */}
            <IntiveTile
              icon={<Award />}
              title="Success Tile"
              value="342"
              subtitle="Badges earned"
              variant="success"
            />
          </div>

          {/* Accent Tile (full width) */}
          <IntiveTile
            icon={<MapPin />}
            title="Accent Tile"
            subtitle="Large format with gradient background"
            variant="accent"
            size="lg"
          >
            <div className="mt-4 flex gap-4">
              <div className="bg-white/10 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-xs text-gray-400">Countries</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-white">2,000+</div>
                <div className="text-xs text-gray-400">Employees</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-white">21</div>
                <div className="text-xs text-gray-400">Offices</div>
              </div>
            </div>
          </IntiveTile>
        </section>

        {/* Color Palette Reference */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Intive Brand Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-xl p-6">
              <div className="w-full h-16 bg-[#007fd1] rounded-lg mb-3" />
              <div className="text-white font-semibold text-sm mb-1">Primary Blue</div>
              <div className="text-gray-400 text-xs font-mono">#007fd1</div>
            </div>
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-xl p-6">
              <div className="w-full h-16 bg-[#00D68F] rounded-lg mb-3" />
              <div className="text-white font-semibold text-sm mb-1">Accent Green</div>
              <div className="text-gray-400 text-xs font-mono">#00D68F</div>
            </div>
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-xl p-6">
              <div className="w-full h-16 bg-[#0f0f0f] border border-[#333333] rounded-lg mb-3" />
              <div className="text-white font-semibold text-sm mb-1">Primary Black</div>
              <div className="text-gray-400 text-xs font-mono">#0f0f0f</div>
            </div>
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-xl p-6">
              <div className="w-full h-16 bg-[#f3f3f3] rounded-lg mb-3" />
              <div className="text-white font-semibold text-sm mb-1">Light Gray</div>
              <div className="text-gray-400 text-xs font-mono">#f3f3f3</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
