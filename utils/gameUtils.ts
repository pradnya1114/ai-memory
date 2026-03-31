
import { LEADERBOARD_STORAGE_KEY, SAFE_PADDING_PERCENT, TOP_SCORES_COUNT } from '../constants';
import { LeaderboardEntry, NumberNodeData } from '../types';

/**
 * Generates random positions for nodes ensuring they don't overlap.
 * Uses a simple rejection sampling method.
 */
export const generateNodePositions = (count: number, minDistPercent: number): NumberNodeData[] => {
  const nodes: NumberNodeData[] = [];
  const maxAttempts = 2000;

  for (let i = 1; i <= count; i++) {
    let attempt = 0;
    let valid = false;
    let x = 0;
    let y = 0;

    while (!valid && attempt < maxAttempts) {
      // Generate random position within safe padding
      x = SAFE_PADDING_PERCENT + Math.random() * (100 - 2 * SAFE_PADDING_PERCENT);
      y = SAFE_PADDING_PERCENT + Math.random() * (100 - 2 * SAFE_PADDING_PERCENT);

      valid = true;

      // Check distance against all existing nodes
      for (const existing of nodes) {
        const dx = existing.x - x;
        const dy = existing.y - y;
        // Simple Euclidean distance check on percentage coordinates
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < minDistPercent) {
          valid = false;
          break;
        }
      }
      attempt++;
    }

    if (!valid) {
      console.warn("Could not find non-overlapping position, placing randomly.");
    }

    nodes.push({
      value: i,
      x,
      y,
      isClicked: false
    });
  }

  return nodes;
};

export const formatTime = (ms: number): string => {
  const seconds = ms / 1000;
  return seconds.toFixed(2);
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse leaderboard", e);
    return [];
  }
};

export const saveScore = (name: string, time: number, difficulty: any): LeaderboardEntry[] => {
  const currentLeaderboard = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    name: name.trim() || "Anonymous",
    time,
    difficulty,
    timestamp: Date.now()
  };

  const updated = [...currentLeaderboard, newEntry]
    .sort((a, b) => a.time - b.time) // Ascending order (lower is better)
    .slice(0, TOP_SCORES_COUNT);

  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
