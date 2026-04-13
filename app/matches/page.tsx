'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';
import { MATCHES } from '@/lib/mock-data';
import { Match } from '@/lib/types';

type FilterType = 'all' | 'upcoming' | 'live' | 'finished';

export default function MatchesPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredMatches = filter === 'all'
    ? MATCHES
    : MATCHES.filter(m => m.status === filter);

  const groupedMatches: Record<string, Match[]> = {};
  filteredMatches.forEach(match => {
    const key = match.stage;
    if (!groupedMatches[key]) groupedMatches[key] = [];
    groupedMatches[key].push(match);
  });

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
              <span className="ml-2 text-lg text-gray-400">All Matches</span>
            </div>
          </div>

          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title & Filter */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">
              All <span className="text-[#007fd1]">Matches</span>
            </h1>
            <p className="text-gray-400">104 matches • June 11 - July 19, 2026</p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2 bg-black/50 rounded-full p-2"
          >
            {(['all', 'upcoming', 'live', 'finished'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition capitalize ${
                  filter === f
                    ? 'bg-[#007fd1] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Matches by Stage */}
        {Object.entries(groupedMatches).map(([stage, matches], stageIndex) => (
          <div key={stage} className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="text-2xl font-bold mb-6 flex items-center gap-3"
            >
              <Calendar className="w-6 h-6 text-[#007fd1]" />
              {stage.replace('_', ' ').toUpperCase()} STAGE
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {matches.map((match, matchIndex) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  delay={stageIndex * 0.1 + matchIndex * 0.05}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchCard({ match, delay }: { match: Match; delay: number }) {
  const hasPredicted = Math.random() > 0.3; // Mock prediction state
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-black/40 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all ${
        isLive
          ? 'border-red-500'
          : isFinished
          ? 'border-gray-700'
          : 'border-[#0f0f0f] hover:border-[#007fd1]/50'
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-400">
          {new Date(match.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>

        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE {match.minute}'
            </div>
          )}
          {isFinished && (
            <div className="bg-gray-700/30 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
              FULL TIME
            </div>
          )}
          {!isLive && !isFinished && (
            <div className="bg-[#007fd1]/20 text-[#007fd1] px-3 py-1 rounded-full text-xs font-semibold">
              Group {match.group}
            </div>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-4 mb-4">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-4xl">{match.homeTeam.flag}</div>
            <div className="font-semibold text-lg">{match.homeTeam.name}</div>
          </div>

          {(isLive || isFinished) && (
            <div className="text-4xl font-bold w-12 text-center">
              {match.homeScore}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-4xl">{match.awayTeam.flag}</div>
            <div className="font-semibold text-lg">{match.awayTeam.name}</div>
          </div>

          {(isLive || isFinished) && (
            <div className="text-4xl font-bold w-12 text-center">
              {match.awayScore}
            </div>
          )}
        </div>
      </div>

      {/* Venue */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <span>📍</span>
        {match.venue}, {match.city}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#333333]">
        {isLive ? (
          <Link href="/live" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-500 text-white font-bold py-3 rounded-lg"
            >
              Watch Live
            </motion.button>
          </Link>
        ) : isFinished ? (
          <div className="flex-1 flex items-center justify-between">
            {hasPredicted ? (
              <>
                <div className="text-sm text-gray-400">Your prediction: 2-1</div>
                <div className="text-[#007fd1] font-bold">+2 pts</div>
              </>
            ) : (
              <div className="text-sm text-gray-500">No prediction</div>
            )}
          </div>
        ) : (
          <>
            {hasPredicted ? (
              <div className="flex items-center gap-2 text-[#007fd1] text-sm font-semibold">
                <div className="w-2 h-2 bg-[#007fd1] rounded-full" />
                Predicted: 2-1
              </div>
            ) : (
              <div className="text-sm text-gray-500">Not predicted yet</div>
            )}
            <Link href={`/predict/${match.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#007fd1] text-black font-bold px-6 py-2 rounded-lg text-sm"
              >
                {hasPredicted ? 'Update' : 'Predict'}
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
