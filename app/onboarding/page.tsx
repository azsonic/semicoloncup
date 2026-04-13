'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { OFFICES } from '@/lib/mock-data';
import { getFlagEmoji } from '@/lib/utils';

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Welcome to ;cup!',
    subtitle: "Let's get you set up in 30 seconds",
    emoji: '🎉',
  },
  {
    id: 'rules',
    type: 'quiz',
    question: 'How many points for an EXACT score prediction?',
    options: ['1 point', '3 points', '5 points', '10 points'],
    correct: 2,
    explanation: 'Correct! 5 points for exact score, 2 points for correct outcome.',
  },
  {
    id: 'office',
    type: 'select',
    question: 'Which intive office are you part of?',
    emoji: '🏢',
  },
  {
    id: 'motivation',
    type: 'quiz',
    question: "What's your prediction goal?",
    options: ['Win it all 🏆', 'Beat my colleagues 💪', 'Just for fun 🎮', 'Rep my office 🌍'],
    correct: -1, // No wrong answer
    explanation: "Great choice! Let's make it happen.",
  },
  {
    id: 'ready',
    type: 'final',
    title: "You're All Set!",
    subtitle: 'Time to make your first predictions',
    emoji: '⚽',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const step = ONBOARDING_STEPS[currentStep];

  const handleAnswer = (index: number) => {
    if (step.type === 'quiz') {
      setAnswers([...answers, index]);
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        nextStep();
      }, 2000);
    }
  };

  const handleOfficeSelect = (officeId: string) => {
    setSelectedOffice(officeId);
    setTimeout(() => nextStep(), 500);
  };

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const finish = () => {
    // Store user data (in real app, would call API)
    localStorage.setItem('userOffice', selectedOffice || 'krakow');
    localStorage.setItem('onboardingComplete', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-[#0f0f0f] flex items-center justify-center px-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#007fd1] to-[#007fd1]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Step Counter */}
      <div className="fixed top-8 right-8 text-gray-400 text-sm font-mono">
        {currentStep + 1} / {ONBOARDING_STEPS.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full max-w-3xl"
        >
          {step.type === 'intro' && (
            <IntroStep step={step} onNext={nextStep} />
          )}

          {step.type === 'quiz' && (
            <QuizStep
              step={step}
              onAnswer={handleAnswer}
              showExplanation={showExplanation}
              selectedAnswer={answers[answers.length - 1]}
            />
          )}

          {step.type === 'select' && (
            <OfficeSelectStep
              onSelect={handleOfficeSelect}
              selectedOffice={selectedOffice}
            />
          )}

          {step.type === 'final' && (
            <FinalStep step={step} onFinish={finish} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IntroStep({ step, onNext }: { step: any; onNext: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        className="text-9xl mb-8"
      >
        {step.emoji}
      </motion.div>
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#007fd1] to-[#007fd1] bg-clip-text text-transparent">
        {step.title}
      </h1>
      <p className="text-2xl text-gray-400 mb-12">{step.subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-gradient-to-r from-[#007fd1] to-[#007fd1] text-black font-bold text-2xl px-16 py-6 rounded-full hover:shadow-2xl hover:shadow-[#007fd1]/50 transition-all"
      >
        Let's Go!
      </motion.button>
    </div>
  );
}

function QuizStep({ step, onAnswer, showExplanation, selectedAnswer }: any) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-12">{step.question}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {step.options.map((option: string, index: number) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = step.correct === -1 || index === step.correct;
          const showResult = showExplanation && isSelected;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !showExplanation && onAnswer(index)}
              disabled={showExplanation}
              className={`relative p-8 rounded-2xl text-2xl font-bold transition-all overflow-hidden ${
                showResult
                  ? isCorrect
                    ? 'bg-[#007fd1] text-black'
                    : 'bg-red-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-[#007fd1]'
              }`}
            >
              {/* Kahoot-style color blocks */}
              <div className={`absolute top-4 left-4 w-12 h-12 rounded-lg ${
                ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'][index]
              }`} />

              <div className="ml-16">{option}</div>

              {showResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 text-4xl"
                >
                  {isCorrect ? '✓' : '✗'}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-gray-300 bg-black/50 rounded-xl p-6"
        >
          {step.explanation}
        </motion.div>
      )}
    </div>
  );
}

function OfficeSelectStep({ onSelect, selectedOffice }: any) {
  return (
    <div className="text-center">
      <div className="text-6xl mb-6">🏢</div>
      <h2 className="text-4xl font-bold mb-12">Which intive office are you part of?</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
        {OFFICES.map((office) => (
          <motion.button
            key={office.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(office.id)}
            className={`p-6 rounded-2xl text-left transition-all ${
              selectedOffice === office.id
                ? 'bg-[#007fd1] text-black border-2 border-[#007fd1]'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-[#007fd1]'
            }`}
          >
            <div className="text-4xl mb-2">{getFlagEmoji(office.country)}</div>
            <div className="font-bold text-xl mb-1">{office.city}</div>
            <div className="text-sm opacity-70">{office.employeeCount} employees</div>
            {selectedOffice === office.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 text-2xl"
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function FinalStep({ step, onFinish }: any) {
  return (
    <div className="text-center">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1 }}
        className="text-9xl mb-8"
      >
        {step.emoji}
      </motion.div>
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#007fd1] to-[#007fd1] bg-clip-text text-transparent">
        {step.title}
      </h1>
      <p className="text-2xl text-gray-400 mb-12">{step.subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFinish}
        className="bg-gradient-to-r from-[#007fd1] to-[#007fd1] text-black font-bold text-2xl px-16 py-6 rounded-full hover:shadow-2xl hover:shadow-[#007fd1]/50 transition-all"
      >
        Start Predicting!
      </motion.button>
    </div>
  );
}
