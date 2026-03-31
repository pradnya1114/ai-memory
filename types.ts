
export enum GameScreenState {
  START = 'START',
  REGISTRATION = 'REGISTRATION',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT'
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface LevelConfig {
  id: Difficulty;
  label: string;
  nodeCount: number;
  memorizeTime: number; // ms
  minDistance: number; // %
}

export interface LeaderboardEntry {
  name: string;
  time: number; // in milliseconds
  difficulty: Difficulty;
  timestamp: number;
}

export interface NumberNodeData {
  value: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  isClicked: boolean;
}

