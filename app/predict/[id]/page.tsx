'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { MATCHES } from '@/lib/mock-data';

export default function PredictPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const match = MATCHES.find(m => m.id === params.id) || MATCHES[0];

  const [homeScore, setHomeScore] = useState(1);
  const [awayScore, setAwayScore] = useState(1);
  const [firstGoalTime, setFirstGoalTime] = useState<'before15' | 'after15' | null>(null);
  const [totalGoals, setTotalGoals] = useState<'under2.5' | 'over2.5' | null>(null);
  const [bothScore, setBothScore] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In real app, would call API to save prediction
    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const canSubmit = homeScore !== null && awayScore !== null;
  const potentialPoints = 5 + (firstGoalTime ? 1 : 0) + (totalGoals ? 1 : 0) + (bothScore !== null ? 1 : 0);

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-9xl mb-6"
          >
            ✓
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 text-[#00D68F]">Prediction Saved!</h1>
          <p className="text-xl text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f0f] to-black">
      {/* Header */}
      <div className="border-b border-[#333333] bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>

          <div className="text-center">
            <div className="text-sm text-gray-400">Predict Match</div>
            <div className="text-lg font-bold">
              <span className="text-[#007fd1]">;</span>
              <span className="text-[#007fd1]">cup</span>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Up to <span className="text-[#007fd1] font-bold">{potentialPoints}pts</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Match Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-[#007fd1]/20 text-[#007fd1] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Group {match.group} • {match.stage.replace('_', ' ').toUpperCase()}
          </div>

          <div className="text-gray-400 mb-2">
            {new Date(match.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>

          <div className="text-lg text-gray-500 mb-8">{match.venue}, {match.city}</div>
        </motion.div>

        {/* Score Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f0f0f] backdrop-blur-sm border-2 border-[#333333] rounded-3xl p-12 mb-8"
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-8xl mb-4"
              >
                {match.homeTeam.flag}
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">{match.homeTeam.name}</h2>

              <ScoreSelector value={homeScore} onChange={setHomeScore} />
            </div>

            {/* VS */}
            <div className="mx-8">
              <div className="text-6xl font-bold text-gray-700">:</div>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-8xl mb-4"
              >
                {match.awayTeam.flag}
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">{match.awayTeam.name}</h2>

              <ScoreSelector value={awayScore} onChange={setAwayScore} />
            </div>
          </div>

          {/* Prediction Summary */}
          <div className="text-center mt-8 text-2xl">
            <span className="text-gray-400">Your prediction: </span>
            <span className="font-bold text-[#007fd1]">{match.homeTeam.code}</span>
            <span className="mx-4 text-[#00D68F] font-bold">{homeScore} - {awayScore}</span>
            <span className="font-bold text-[#007fd1]">{match.awayTeam.code}</span>
          </div>
        </motion.div>

        {/* Bonus Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f0f0f] backdrop-blur-sm border-2 border-[#333333] rounded-3xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            ⚡ Bonus Predictions <span className="text-sm text-gray-500">(+1pt each)</span>
          </h3>

          <div className="space-y-6">
            {/* First Goal Time */}
            <BonusQuestion
              question="When will the first goal be scored?"
              options={[
                { id: 'before15', label: 'Before 15 minutes', emoji: '⏱️' },
                { id: 'after15', label: 'After 15 minutes', emoji: '⏰' },
              ]}
              selected={firstGoalTime}
              onSelect={setFirstGoalTime}
            />

            {/* Total Goals */}
            <BonusQuestion
              question="Total goals in the match?"
              options={[
                { id: 'under2.5', label: 'Under 2.5 goals', emoji: '🛡️' },
                { id: 'over2.5', label: 'Over 2.5 goals', emoji: '🔥' },
              ]}
              selected={totalGoals}
              onSelect={setTotalGoals}
            />

            {/* Both Teams Score */}
            <BonusQuestion
              question="Will both teams score?"
              options={[
                { id: true, label: 'Yes', emoji: '✓' },
                { id: false, label: 'No', emoji: '✗' },
              ]}
              selected={bothScore}
              onSelect={setBothScore}
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={canSubmit ? { scale: 1.05 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`font-bold text-2xl px-16 py-6 rounded-full transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-[#007fd1] to-[#00D68F] text-white hover:shadow-2xl hover:shadow-[#007fd1]/50'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-3">
              <Check className="w-6 h-6" />
              Submit Prediction
            </span>
          </motion.button>

          <p className="text-gray-500 text-sm mt-4">
            Predictions lock 1 hour before kickoff
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ScoreSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-12 h-12 bg-red-500/20 hover:bg-red-500/40 border border-red-500 rounded-full text-red-500 font-bold text-2xl"
      >
        −
      </motion.button>

      <div className="w-24 h-24 bg-black/50 border-4 border-[#007fd1] rounded-2xl flex items-center justify-center">
        <div className="text-5xl font-bold text-[#007fd1]">{value}</div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(9, value + 1))}
        className="w-12 h-12 bg-[#007fd1]/20 hover:bg-[#007fd1]/40 border border-[#007fd1] rounded-full text-[#007fd1] font-bold text-2xl"
      >
        +
      </motion.button>
    </div>
  );
}

function BonusQuestion({ question, options, selected, onSelect }: any) {
  return (
    <div>
      <div className="text-lg mb-3 text-gray-300">{question}</div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option: any) => {
          const isSelected = selected === option.id;
          return (
            <motion.button
              key={option.id.toString()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.id)}
              className={`p-4 rounded-xl font-semibold transition-all ${
                isSelected
                  ? 'bg-[#007fd1] text-white border-2 border-[#00D68F]'
                  : 'bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#007fd1]/50'
              }`}
            >
              <span className="text-2xl mr-2">{option.emoji}</span>
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
