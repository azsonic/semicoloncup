'use client';

import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Target } from 'lucide-react';
import Link from 'next/link';
import { OFFICES } from '@/lib/mock-data';
import { getFlagEmoji } from '@/lib/utils';

export default function LandingPage() {
  const tournamentStart = new Date('2026-06-11T18:00:00Z');
  const now = new Date();
  const daysUntil = Math.ceil((tournamentStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f0f] to-black">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007fd1] rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D68F] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          {/* Semicolon Logo */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-9xl font-bold mb-4"
          >
            <span className="text-[#007fd1]">;</span>
            <span className="text-[#007fd1]">cup</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-xl mb-2"
          >
            intive FIFA World Cup 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007fd1] to-[#00D68F] bg-clip-text text-transparent"
          >
            Predict. Compete. Conquer.
          </motion.h1>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-block bg-[#0f0f0f] backdrop-blur-sm border-2 border-[#333333] rounded-2xl px-8 py-4 mb-8"
          >
            <div className="text-sm text-gray-400 mb-1">Tournament starts in</div>
            <div className="text-5xl font-bold text-[#007fd1]">{daysUntil}</div>
            <div className="text-sm text-gray-400 mt-1">days</div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/onboarding">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#007fd1] to-[#00D68F] text-white font-bold text-xl px-12 py-4 rounded-full hover:shadow-2xl hover:shadow-[#007fd1]/50 transition-all"
              >
                Join the Pack
              </motion.button>
            </Link>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-500 text-sm mt-6 italic"
          >
            Never settle. Predict better.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          <StatsCard icon={<Trophy className="w-6 h-6" />} label="104 Matches" color="from-[#007fd1]" />
          <StatsCard icon={<Users className="w-6 h-6" />} label="9 Offices" color="from-[#00D68F]" />
          <StatsCard icon={<Target className="w-6 h-6" />} label="48 Teams" color="from-[#007fd1]" />
          <StatsCard icon={<Calendar className="w-6 h-6" />} label="39 Days" color="from-[#00D68F]" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-gray-600"
        >
          <div className="text-sm">Scroll to learn more</div>
          <div className="text-2xl text-center">↓</div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-[#007fd1] to-[#00D68F] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="Predict Matches"
              description="Predict exact scores for all 104 FIFA 2026 matches. Exact score = 5pts, correct outcome = 2pts."
              icon="⚽"
            />
            <FeatureCard
              number="02"
              title="Represent Your Office"
              description="Every point counts for your office. Will Kraków beat Buenos Aires? Will München top the leaderboard?"
              icon="🏢"
            />
            <FeatureCard
              number="03"
              title="Win Glory"
              description="Climb the leaderboard, unlock badges, and earn bragging rights. The Oracle awaits."
              icon="🏆"
            />
          </div>
        </div>
      </div>

      {/* Office Battle Preview */}
      <div className="relative z-10 py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-[#007fd1]">Office Battle</span> Mode
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            See your office compete against intive locations worldwide on a live battle map.
            <br />
            <span className="text-[#00D68F]">Kraków vs München vs Buenos Aires</span> — who will dominate?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0f0f0f] border-2 border-[#333333] rounded-lg p-4 hover:border-[#007fd1] transition-colors"
              >
                <div className="text-2xl mb-2">{getFlagEmoji(office.country)}</div>
                <div className="text-sm text-gray-400">{office.city}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6">Ready to Predict?</h2>
          <p className="text-xl text-gray-400 mb-8">Join {OFFICES.reduce((acc, o) => acc + o.employeeCount, 0).toLocaleString()}+ intive colleagues</p>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#007fd1] to-[#00D68F] text-white font-bold text-xl px-12 py-4 rounded-full hover:shadow-2xl hover:shadow-[#007fd1]/50 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#333333] py-8 text-center text-gray-600">
        <div className="text-sm">
          Built with 💙 by intive | <span className="text-[#007fd1]">;</span>cup © 2026
        </div>
      </footer>
    </div>
  );
}

function StatsCard({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-[#0f0f0f] backdrop-blur-sm border-2 border-[#333333] rounded-xl p-6 text-center hover:border-[#007fd1] transition-all"
    >
      <div className={`inline-block bg-gradient-to-br ${color} to-transparent p-3 rounded-lg mb-3`}>
        {icon}
      </div>
      <div className="text-lg font-semibold text-white">{label}</div>
    </motion.div>
  );
}

function FeatureCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-[#0f0f0f] backdrop-blur-sm border-2 border-[#333333] rounded-2xl p-8 hover:border-[#007fd1] transition-all"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <div className="text-sm text-[#007fd1] font-mono mb-2">{number}</div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
