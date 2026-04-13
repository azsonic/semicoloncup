export interface Office {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  employeeCount: number;
  totalPoints: number;
  avgPointsPerEmployee: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  officeId: string;
  points: number;
  exactScores: number;
  correctOutcomes: number;
  missedPredictions: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  joinedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  flag: string;
  group?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  city: string;
  date: Date;
  stage: 'group' | 'round_of_32' | 'round_of_16' | 'quarter' | 'semi' | 'final' | 'third_place';
  group?: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  minute?: number;
}

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  bonusQuestions?: {
    firstGoalTime?: 'before15' | 'after15';
    totalGoals?: 'under2.5' | 'over2.5';
    bothTeamsScore?: boolean;
  };
  createdAt: Date;
  points?: number;
}

export interface TournamentPrediction {
  userId: string;
  winner?: string;
  finalist?: string;
  goldenBoot?: string;
  groupWinners?: Record<string, string>;
  darkHorse?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  office: Office;
  points: number;
  exactScores: number;
  correctOutcomes: number;
  trend: 'up' | 'down' | 'same';
}

export interface FunStat {
  id: string;
  title: string;
  description: string;
  value: string | number;
  userId?: string;
  userName?: string;
  icon: string;
  color: string;
}
