'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Target, Flame, Shield, Crown, Clock } from 'lucide-react';
import Link from 'next/link';
import { FUN_STATS, MOCK_USERS, OFFICES } from '@/lib/mock-data';
import { getFlagEmoji } from '@/lib/utils';

export default function StatsPage() {
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
              <span className="ml-2 text-lg text-gray-400">Fun Stats</span>
            </div>
          </div>

          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Fun <span className="text-[#007fd1]">Stats</span> & Analytics
          </h1>
          <p className="text-xl text-gray-400">
            Who's really the best predictor? The numbers don't lie. 📊
          </p>
        </motion.div>

        {/* Fun Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FUN_STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-2xl p-6 hover:border-[#007fd1]/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-5xl ${stat.color}`}>{stat.icon}</div>
                <div className="text-xs bg-[#007fd1]/20 text-[#007fd1] px-3 py-1 rounded-full">
                  Stat
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{stat.description}</p>

              <div className="bg-black/30 rounded-lg p-4">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Country Bias Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            🎯 Country Bias Detector
          </h2>
          <p className="text-gray-400 mb-8">
            Are employees over-predicting wins for their home countries? Let's find out!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { country: '🇦🇷 Argentina', office: 'Buenos Aires', bias: '+2.3 goals', level: 'high' },
              { country: '🇵🇱 Poland', office: 'Kraków', bias: '+1.8 goals', level: 'medium' },
              { country: '🇩🇪 Germany', office: 'München', bias: '+1.2 goals', level: 'medium' },
              { country: '🇮🇳 India', office: 'Ahmedabad', bias: '+0.5 goals', level: 'low' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className={`bg-black/30 border-2 rounded-xl p-4 ${
                  item.level === 'high'
                    ? 'border-red-500'
                    : item.level === 'medium'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <div className="text-3xl mb-2">{item.country.split(' ')[0]}</div>
                <div className="font-bold mb-1">{item.office}</div>
                <div className={`text-lg font-bold ${
                  item.level === 'high' ? 'text-red-400' : item.level === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {item.bias}
                </div>
                <div className="text-xs text-gray-500 mt-1">vs neutral predictions</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Office Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            🏢 Office Performance Matrix
          </h2>

          <div className="space-y-6">
            {OFFICES.slice(0, 5).map((office, index) => {
              const percentage = (office.avgPointsPerEmployee / 30) * 100; // Normalize to 30 as max
              return (
                <div key={office.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFlagEmoji(office.country)}</span>
                      <span className="font-bold">{office.city}</span>
                      <span className="text-sm text-gray-500">({office.employeeCount} employees)</span>
                    </div>
                    <div className="text-xl font-bold text-[#007fd1]">
                      {office.avgPointsPerEmployee.toFixed(2)} pts
                    </div>
                  </div>

                  <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#007fd1] to-[#007fd1] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Prediction Patterns */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              📊 Prediction Distribution
            </h2>

            <div className="space-y-4">
              {[
                { score: '1-0', count: 234, percentage: 18 },
                { score: '2-1', count: 198, percentage: 15 },
                { score: '2-0', count: 156, percentage: 12 },
                { score: '1-1', count: 145, percentage: 11 },
                { score: '3-1', count: 112, percentage: 9 },
                { score: 'Other', count: 455, percentage: 35 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 font-mono font-bold">{item.score}</div>
                  <div className="flex-1">
                    <div className="relative h-6 bg-gray-800 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-[#007fd1] rounded"
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-400">
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              ⏰ Prediction Timing
            </h2>

            <div className="space-y-6">
              {[
                { label: 'Early Birds', time: '24h+ before', count: 245, icon: '🐦', color: 'text-green-400' },
                { label: 'Planners', time: '6-24h before', count: 389, icon: '📅', color: 'text-blue-400' },
                { label: 'Last Minute', time: '1-6h before', count: 198, icon: '⏰', color: 'text-yellow-400' },
                { label: 'Edge Cases', time: 'Under 1h', count: 68, icon: '🚨', color: 'text-red-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="bg-black/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-bold">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievement Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-black/40 backdrop-blur-sm border-2 border-[#0f0f0f] rounded-3xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">🏆 Notable Achievements</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Longest Streak', value: '12 in a row', user: 'Anna Kowalska', icon: '🔥' },
              { title: 'Most Exact Scores', value: '18 perfect', user: 'Carlos Mendez', icon: '🎯' },
              { title: 'Most Active', value: '104/104 predicted', user: 'Sarah Chen', icon: '💪' },
            ].map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-b from-[#007fd1]/20 to-black/30 border-2 border-[#007fd1]/30 rounded-2xl p-6"
              >
                <div className="text-6xl mb-4">{achievement.icon}</div>
                <div className="text-lg font-bold mb-2">{achievement.title}</div>
                <div className="text-3xl font-bold text-[#007fd1] mb-2">{achievement.value}</div>
                <div className="text-sm text-gray-400">{achievement.user}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
