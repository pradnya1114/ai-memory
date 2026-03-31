
import { LevelConfig } from "./types";

export const APP_TITLE = "AI Memory Reflex";
export const LEADERBOARD_STORAGE_KEY = "ai_reflex_leaderboard_v2";
export const TOP_SCORES_COUNT = 10;
export const SAFE_PADDING_PERCENT = 8; // Keep nodes away from very edge

export const LEVELS: Record<string, LevelConfig> = {
  EASY: {
    id: 'EASY',
    label: 'Level 1 (1-10)',
    nodeCount: 10,
    memorizeTime: 3000,
    minDistance: 12
  },
  MEDIUM: {
    id: 'MEDIUM',
    label: 'Level 2 (1-20)',
    nodeCount: 20,
    memorizeTime: 5000,
    minDistance: 9
  },
  HARD: {
    id: 'HARD',
    label: 'Level 3 (1-30)',
    nodeCount: 30,
    memorizeTime: 7000,
    minDistance: 7
  }
};
