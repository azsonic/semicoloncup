'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { OFFICES, MOCK_USERS } from '@/lib/mock-data';
import { Office, User } from '@/lib/types';
import { getFlagEmoji } from '@/lib/utils';

export default function LeaderboardPage() {
  const [view, setView] = useState<'global' | 'office'>('office');
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  // Sort offices by average points
  const rankedOffices = [...OFFICES].sort((a, b) => b.avgPointsPerEmployee - a.avgPointsPerEmployee);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0f0f0f]">
      {/* Header */}
      <div className="border-b border-[#0f0f0f] bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>

          <div className="text-center">
            <div className="text-2xl font-bold">
              <span className="text-[#007fd1]">;</span>
              <span className="text-[#007fd1]">cup</span>
              <span className="ml-2 text-lg text-gray-400">Leaderboard</span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-black/50 rounded-full p-1">
            <button
              onClick={() => setView('office')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                view === 'office' ? 'bg-[#007fd1] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Office Battle
            </button>
            <button
              onClick={() => setView('global')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                view === 'global' ? 'bg-[#007fd1] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Global
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'office' ? (
            <motion.div
              key="office"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <OfficeBattleView
                offices={rankedOffices}
                selectedOffice={selectedOffice}
                onSelectOffice={setSelectedOffice}
              />
            </motion.div>
          ) : (
            <motion.div
              key="global"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlobalLeaderboardView users={MOCK_USERS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OfficeBattleView({ offices, selectedOffice, onSelectOffice }: any) {
  const topOffice = offices[0];

  return (
    <div>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-[#007fd1]">Office Battle</span> Map
        </h1>
        <p className="text-xl text-gray-400">
          Which intive office will dominate <span className="text-[#007fd1]">;</span>cup?
        </p>
      </motion.div>

      {/* Current Leader Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 bg-gradient-to-r from-[#007fd1]/20 to-[#007fd1]/20 border-2 border-[#007fd1] rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#007fd1]/5 animate-pulse-glow" />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">👑</div>
          <div className="text-sm text-[#007fd1] font-semibold mb-2">CURRENT LEADER</div>
          <div className="text-4xl font-bold mb-2">
            {getFlagEmoji(topOffice.country)} {topOffice.city}
          </div>
          <div className="text-2xl text-gray-300">
            {topOffice.avgPointsPerEmployee.toFixed(2)} avg pts/employee
          </div>
        </div>
      </motion.div>

      {/* Office Battle Map (Simplified World Map) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8 mb-8 relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Global Office Rankings</h2>

        {/* Stylized World Map Background */}
        <div className="relative h-96 mb-8 bg-[#0f0f0f]/30 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

          {/* Office Markers on Map */}
          {offices.map((office: Office, index: number) => {
            const rank = index + 1;
            const size = rank === 1 ? 80 : rank === 2 ? 70 : rank === 3 ? 60 : 50;
            // Simplified positioning (in production, would use actual map projection)
            const position = getOfficePosition(office);

            return (
              <motion.div
                key={office.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                onClick={() => onSelectOffice(office.id)}
                className="absolute cursor-pointer"
                style={{
                  left: position.x,
                  top: position.y,
                  width: size,
                  height: size,
                }}
              >
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full ${
                    rank === 1 ? 'bg-[#007fd1]' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-orange-600' : 'bg-[#007fd1]'
                  }`}
                />

                {/* Office Marker */}
                <div
                  className={`absolute inset-0 rounded-full flex items-center justify-center font-bold text-black ${
                    rank === 1
                      ? 'bg-gradient-to-br from-[#007fd1] to-yellow-600'
                      : rank === 2
                      ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                      : rank === 3
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                      : 'bg-gradient-to-br from-[#007fd1] to-green-700'
                  }`}
                >
                  <div className="text-center">
                    <div className={`${size > 60 ? 'text-2xl' : 'text-lg'}`}>{getFlagEmoji(office.country)}</div>
                    {rank <= 3 && <div className="text-xs font-bold">#{rank}</div>}
                  </div>
                </div>

                {/* Office Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-center">
                  <div className="font-bold">{office.city}</div>
                  <div className="text-[#007fd1]">{office.avgPointsPerEmployee.toFixed(1)}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Office Rankings List */}
        <div className="grid md:grid-cols-2 gap-4">
          {offices.map((office: Office, index: number) => (
            <OfficeRankCard key={office.id} office={office} rank={index + 1} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function OfficeRankCard({ office, rank }: { office: Office; rank: number }) {
  const medalColor = rank === 1 ? 'text-[#007fd1]' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-orange-500' : 'text-gray-600';
  const borderColor = rank === 1 ? 'border-[#007fd1]' : rank === 2 ? 'border-gray-400' : rank === 3 ? 'border-orange-500' : 'border-[#0f0f0f]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05 }}
      whileHover={{ y: -5, borderColor: '#007fd1' }}
      className={`bg-black/30 border-2 ${borderColor} rounded-xl p-4 transition-all`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`text-3xl font-bold ${medalColor}`}>
            {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getFlagEmoji(office.country)}</span>
              <span className="font-bold text-lg">{office.city}</span>
            </div>
            <div className="text-sm text-gray-400">{office.employeeCount} employees</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-[#007fd1]">{office.avgPointsPerEmployee.toFixed(2)}</div>
          <div className="text-xs text-gray-500">avg pts</div>
        </div>
      </div>
    </motion.div>
  );
}

function GlobalLeaderboardView({ users }: { users: User[] }) {
  const rankedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          Global <span className="text-[#007fd1]">Leaderboard</span>
        </h1>
        <p className="text-xl text-gray-400">Top predictors across all offices</p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
        {rankedUsers.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const heights = ['h-72', 'h-64', 'h-56'];
          const orders = [1, 0, 2]; // Second place, First place, Third place
          const actualRank = orders.indexOf(index) + 1;

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`order-${orders[index]}`}
            >
              <div className={`${heights[index]} bg-gradient-to-b ${
                actualRank === 1 ? 'from-[#007fd1] to-yellow-700' : actualRank === 2 ? 'from-gray-400 to-gray-600' : 'from-orange-500 to-orange-700'
              } rounded-t-2xl flex flex-col items-center justify-end p-6`}>
                <div className="text-6xl mb-2">{['🥇', '🥈', '🥉'][actualRank - 1]}</div>
                <div className="text-2xl font-bold mb-1">{user.name}</div>
                <div className="text-4xl font-bold">{user.points}</div>
                <div className="text-sm opacity-80">points</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest of Leaderboard */}
      <div className="space-y-3">
        {rankedUsers.slice(3).map((user, index) => (
          <LeaderboardRow key={user.id} user={user} rank={index + 4} />
        ))}
      </div>
    </div>
  );
}

function LeaderboardRow({ user, rank }: { user: User; rank: number }) {
  const userOffice = OFFICES.find(o => o.id === user.officeId);
  const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
      whileHover={{ x: 10, borderColor: '#007fd1' }}
      className="bg-black/30 border-2 border-[#0f0f0f] rounded-xl p-4 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-gray-400 w-12">#{rank}</div>

          <div className="flex items-center gap-2">
            {trend === 'up' && <TrendingUp className="w-5 h-5 text-[#007fd1]" />}
            {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
            {trend === 'same' && <Minus className="w-5 h-5 text-gray-500" />}
          </div>

          <div>
            <div className="font-bold text-lg">{user.name}</div>
            <div className="text-sm text-gray-400">{userOffice?.city}</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-sm text-gray-400">Exact</div>
            <div className="font-bold text-[#007fd1]">{user.exactScores}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-400">Streak</div>
            <div className="font-bold text-[#007fd1]">{user.currentStreak}</div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-[#007fd1]">{user.points}</div>
            <div className="text-xs text-gray-500">points</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getOfficePosition(office: Office): { x: string; y: string } {
  // Simplified positioning (in production, would use proper map projection)
  const positions: Record<string, { x: string; y: string }> = {
    'krakow': { x: '54%', y: '30%' },
    'munich': { x: '49%', y: '33%' },
    'szczecin': { x: '51%', y: '26%' },
    'wroclaw': { x: '52%', y: '31%' },
    'buenos-aires': { x: '25%', y: '75%' },
    'tampere': { x: '56%', y: '18%' },
    'ahmedabad': { x: '70%', y: '42%' },
    'dublin': { x: '44%', y: '27%' },
    'bucharest': { x: '57%', y: '36%' },
  };
  return positions[office.id] || { x: '50%', y: '50%' };
}
