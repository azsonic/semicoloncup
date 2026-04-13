'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MATCHES, MOCK_USERS, OFFICES } from '@/lib/mock-data';

export default function LiveMatchPage() {
  const [liveMatch] = useState(MATCHES.find(m => m.status === 'live') || MATCHES[4]);
  const [minute, setMinute] = useState(liveMatch.minute || 67);
  const [homeScore, setHomeScore] = useState(liveMatch.homeScore || 1);
  const [awayScore, setAwayScore] = useState(liveMatch.awayScore || 1);
  const [recentEvent, setRecentEvent] = useState<string | null>(null);
  const [leaderboardMovement, setLeaderboardMovement] = useState(false);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMinute(prev => {
        const next = prev + 1;
        if (next > 90) return 90;

        // Random events
        if (Math.random() > 0.9) {
          const events = [
            '🟨 Yellow card',
            '⚽ Close attempt!',
            '🔄 Substitution',
            '⚠️ Dangerous attack',
            '🚑 Injury stoppage',
          ];
          setRecentEvent(events[Math.floor(Math.random() * events.length)]);
          setTimeout(() => setRecentEvent(null), 3000);
        }

        // Simulate goal (rare)
        if (Math.random() > 0.98) {
          if (Math.random() > 0.5) {
            setHomeScore(prev => prev + 1);
            setRecentEvent('⚽ GOOOAL!!! ' + liveMatch.homeTeam.name);
          } else {
            setAwayScore(prev => prev + 1);
            setRecentEvent('⚽ GOOOAL!!! ' + liveMatch.awayTeam.name);
          }
          setLeaderboardMovement(true);
          setTimeout(() => {
            setRecentEvent(null);
            setLeaderboardMovement(false);
          }, 5000);
        }

        return next;
      });
    }, 2000); // Update every 2 seconds for demo

    return () => clearInterval(interval);
  }, [liveMatch]);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Stadium Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-black to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(16,185,129,0.1)_50px,rgba(16,185,129,0.1)_100px)]" />
      </div>

      {/* Animated Crowd Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent opacity-50" />

      {/* Header */}
      <div className="relative z-40 border-b border-[#0f0f0f] bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-500 font-bold text-lg">LIVE</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>1,247 watching</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Match Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-[#007fd1]/20 text-[#007fd1] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {liveMatch.venue}, {liveMatch.city} • Group {liveMatch.group}
          </div>
        </motion.div>

        {/* Main Scoreboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 backdrop-blur-md border-4 border-[#007fd1] rounded-3xl p-12 mb-8 relative overflow-hidden"
        >
          {/* Minute Indicator */}
          <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-6 py-3 rounded-full text-2xl animate-pulse">
            {minute}'
          </div>

          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-9xl mb-4"
              >
                {liveMatch.homeTeam.flag}
              </motion.div>
              <h2 className="text-4xl font-bold mb-2">{liveMatch.homeTeam.name}</h2>
              <motion.div
                key={homeScore}
                initial={{ scale: 1.5, color: '#007fd1' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.5 }}
                className="text-8xl font-bold"
              >
                {homeScore}
              </motion.div>
            </div>

            {/* Center Divider */}
            <div className="mx-12">
              <div className="text-6xl font-bold text-gray-700">-</div>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-9xl mb-4"
              >
                {liveMatch.awayTeam.flag}
              </motion.div>
              <h2 className="text-4xl font-bold mb-2">{liveMatch.awayTeam.name}</h2>
              <motion.div
                key={awayScore}
                initial={{ scale: 1.5, color: '#007fd1' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.5 }}
                className="text-8xl font-bold"
              >
                {awayScore}
              </motion.div>
            </div>
          </div>

          {/* Recent Event Notification */}
          <AnimatePresence>
            {recentEvent && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#007fd1] text-black font-bold text-2xl px-8 py-4 rounded-full shadow-2xl"
              >
                {recentEvent}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Match Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/70 backdrop-blur-md border-2 border-[#0f0f0f] rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              📊 Match Stats
            </h3>

            <div className="space-y-4">
              <StatBar label="Possession" home={58} away={42} />
              <StatBar label="Shots" home={12} away={8} />
              <StatBar label="On Target" home={5} away={3} />
              <StatBar label="Corners" home={7} away={4} />
              <StatBar label="Fouls" home={9} away={11} />
            </div>
          </motion.div>

          {/* Live Leaderboard Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/70 backdrop-blur-md border-2 border-[#0f0f0f] rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#007fd1]" />
              Live Rankings
            </h3>

            {leaderboardMovement && (
              <div className="mb-4 bg-[#007fd1]/20 border border-[#007fd1] rounded-lg p-3 text-center">
                <div className="text-sm text-[#007fd1] font-bold">Leaderboard shifting!</div>
              </div>
            )}

            <div className="space-y-3">
              {MOCK_USERS.slice(0, 5).map((user, i) => {
                const userOffice = OFFICES.find(o => o.id === user.officeId);
                return (
                  <motion.div
                    key={user.id}
                    animate={leaderboardMovement ? { x: [0, -10, 10, 0] } : {}}
                    className="flex items-center justify-between bg-black/50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-gray-500">#{i + 1}</div>
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{userOffice?.city}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#007fd1]">{user.points}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Your Prediction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/70 backdrop-blur-md border-2 border-[#0f0f0f] rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              🎯 Your Prediction
            </h3>

            <div className="bg-gradient-to-br from-[#007fd1]/20 to-[#007fd1]/20 border-2 border-[#007fd1] rounded-xl p-6 mb-4">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-400 mb-2">You predicted:</div>
                <div className="text-4xl font-bold">
                  <span className="text-[#007fd1]">{liveMatch.homeTeam.code}</span>
                  <span className="mx-4 text-[#007fd1]">2 - 1</span>
                  <span className="text-[#007fd1]">{liveMatch.awayTeam.code}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Current score:</span>
                  <span className="font-bold">{homeScore} - {awayScore}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Outcome:</span>
                  <span className={homeScore > awayScore ? 'text-[#007fd1] font-bold' : 'text-gray-500'}>
                    {homeScore > awayScore ? '✓ Correct!' : homeScore === awayScore ? '🤔 Draw' : '✗ Wrong'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Potential points:</span>
                  <span className="text-[#007fd1] font-bold">
                    {homeScore === 2 && awayScore === 1 ? '5pts (exact!)' : homeScore > awayScore ? '2pts' : '0pts'}
                  </span>
                </div>
              </div>
            </div>

            {/* Prediction Confidence */}
            <div className="bg-black/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Prediction confidence:</div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded ${i <= 4 ? 'bg-[#007fd1]' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                278 users predicted the same outcome
              </div>
            </div>
          </motion.div>
        </div>

        {/* Match Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-black/70 backdrop-blur-md border-2 border-[#0f0f0f] rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6">⏱️ Match Timeline</h3>

          <div className="space-y-3">
            {[
              { minute: 67, event: '⚽ GOAL!', team: liveMatch.homeTeam.name, description: 'Amazing strike from outside the box!' },
              { minute: 52, event: '🟨 Yellow Card', team: liveMatch.awayTeam.name, description: 'Tactical foul' },
              { minute: 45, event: '⏱️ Half Time', team: null, description: '1-0' },
              { minute: 23, event: '⚽ GOAL!', team: liveMatch.homeTeam.name, description: 'Header from a corner kick' },
              { minute: 1, event: '⚽ Kick Off', team: null, description: 'Match started' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-4 bg-black/50 rounded-lg p-4"
              >
                <div className="text-lg font-bold text-[#007fd1] w-12">{item.minute}'</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.event}</span>
                    {item.team && <span className="text-sm text-gray-400">• {item.team}</span>}
                  </div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Celebration Effect for Goals */}
      <AnimatePresence>
        {recentEvent?.includes('GOOOAL') && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: i * 0.1 }}
                className="absolute text-6xl pointer-events-none z-50"
              >
                ⚽
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away;
  const homePercentage = (home / total) * 100;
  const awayPercentage = (away / total) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-bold">{home}</span>
        <span className="text-gray-400">{label}</span>
        <span className="font-bold">{away}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${homePercentage}%` }}
          className="bg-[#007fd1]"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${awayPercentage}%` }}
          className="bg-[#007fd1]"
        />
      </div>
    </div>
  );
}
