'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MATCHES, OFFICES, MOCK_USERS } from '@/lib/mock-data';
import { Match } from '@/lib/types';
import { getFlagEmoji } from '@/lib/utils';
import { IntiveStatCard } from '@/app/components/IntiveTile';

export default function DashboardPage() {
  const [user] = useState(MOCK_USERS[0]); // Mock logged-in user
  const userOffice = OFFICES.find(o => o.id === user.officeId);

  const upcomingMatches = MATCHES.filter(m => m.status === 'upcoming').slice(0, 4);
  const liveMatches = MATCHES.filter(m => m.status === 'live');

  return (
    <div className="min-h-screen bg-black">
      {/* Header / Nav */}
      <nav className="border-b border-[#333333] bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#007fd1]">;</span>
            <span className="text-[#007fd1]">cup</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#007fd1] font-semibold">Dashboard</Link>
            <Link href="/matches" className="text-gray-400 hover:text-white transition">Matches</Link>
            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition">Leaderboard</Link>
            <Link href="/stats" className="text-gray-400 hover:text-white transition">Stats</Link>

            <div className="flex items-center gap-2 bg-[#333333]/30 rounded-full px-4 py-2">
              <div className="text-sm">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-400">{userOffice?.city}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-[#007fd1]">{user.name.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-gray-400">
            Representing <span className="text-[#007fd1]">{userOffice?.city}</span> • {userOffice?.employeeCount} colleagues counting on you
          </p>
        </motion.div>

        {/* Live Matches Alert */}
        {liveMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 bg-red-500/20 border-2 border-red-500 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/10 animate-pulse-glow" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-500 font-bold">LIVE NOW</span>
                </div>
                <div className="text-2xl font-bold">
                  {liveMatches[0].homeTeam.name} {liveMatches[0].homeScore} - {liveMatches[0].awayScore} {liveMatches[0].awayTeam.name}
                </div>
                <div className="text-gray-400 text-sm">{liveMatches[0].minute}' • {liveMatches[0].venue}</div>
              </div>
              <Link href="/live">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white font-bold px-8 py-3 rounded-full"
                >
                  Watch Live
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <IntiveStatCard
            icon={<Trophy className="w-6 h-6" />}
            label="Your Points"
            value={user.points}
            subtitle={`Rank #${12}`}
            color="yellow"
          />
          <IntiveStatCard
            icon={<Target className="w-6 h-6" />}
            label="Exact Scores"
            value={user.exactScores}
            subtitle={`${Math.round((user.exactScores / (user.exactScores + user.correctOutcomes)) * 100)}% accuracy`}
            color="green"
          />
          <IntiveStatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Current Streak"
            value={user.currentStreak}
            subtitle={`Best: ${user.longestStreak}`}
            color="purple"
          />
          <IntiveStatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Office Rank"
            value={`#${3}`}
            subtitle={`${userOffice?.city}`}
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Matches */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Upcoming Matches</h2>
              <Link href="/matches" className="text-[#007fd1] hover:text-[#00D68F] transition flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* Office Battle & Badges */}
          <div className="space-y-6">
            {/* Office Standing */}
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-2xl p-6 hover:border-[#007fd1] transition-all">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                🏢 Your Office
              </h3>
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{getFlagEmoji(userOffice?.country || '')}</div>
                <div className="text-2xl font-bold">{userOffice?.city}</div>
                <div className="text-sm text-gray-400">{userOffice?.employeeCount} employees</div>
              </div>
              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Office Rank</span>
                  <span className="text-2xl font-bold text-[#007fd1]">#2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg Points</span>
                  <span className="text-lg font-bold text-[#00D68F]">{userOffice?.avgPointsPerEmployee.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/leaderboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-gradient-to-r from-[#007fd1] to-[#00D68F] text-white font-bold py-3 rounded-lg"
                >
                  View Battle Map
                </motion.button>
              </Link>
            </div>

            {/* Badges */}
            <div className="bg-[#0f0f0f] border-2 border-[#333333] rounded-2xl p-6 hover:border-[#007fd1] transition-all">
              <h3 className="text-xl font-bold mb-4">Your Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-black/30 rounded-xl p-4 text-center cursor-pointer"
                    title={badge.description}
                  >
                    <div className="text-4xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-semibold">{badge.name}</div>
                  </motion.div>
                ))}
                <div className="bg-black/10 border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs">Locked</div>
                  </div>
                </div>
                <div className="bg-black/10 border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs">Locked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match, delay }: { match: Match; delay: number }) {
  const hasPredicted = Math.random() > 0.3; // Mock prediction state

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-[#0f0f0f] border-2 border-[#333333] rounded-2xl p-6 hover:border-[#007fd1] transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-400">
          {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-xs bg-[#007fd1]/20 text-[#007fd1] px-3 py-1 rounded-full">
          Group {match.group}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-4xl">{match.homeTeam.flag}</div>
          <div className="font-semibold">{match.homeTeam.name}</div>
        </div>

        <div className="text-2xl font-bold text-gray-600 mx-4">VS</div>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="font-semibold">{match.awayTeam.name}</div>
          <div className="text-4xl">{match.awayTeam.flag}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{match.venue}</div>
        {hasPredicted ? (
          <div className="flex items-center gap-2 text-[#00D68F] text-sm font-semibold">
            <div className="w-2 h-2 bg-[#00D68F] rounded-full" />
            Predicted: 2-1
          </div>
        ) : (
          <Link href={`/predict/${match.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#007fd1] text-white font-bold px-6 py-2 rounded-lg text-sm"
            >
              Predict Now
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
