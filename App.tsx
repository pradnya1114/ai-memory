import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen';
import RegistrationScreen from './components/RegistrationScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

import {
  GameScreenState,
  LevelConfig,
  LeaderboardEntry,
} from './types';

import { LEVELS } from './constants';

const LEADERBOARD_KEY = 'numberGameLeaderboard';

const App: React.FC = () => {
  const [screen, setScreen] = useState<GameScreenState>(GameScreenState.START);
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(LEVELS.EASY);
  const [lastTime, setLastTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  /* ---------------- LOAD LEADERBOARD ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  /* ---------------- START → REGISTRATION ---------------- */
  const handleStart = () => {
    setScreen(GameScreenState.REGISTRATION);
  };

  /* ---------------- REGISTRATION → PLAYING ---------------- */
  const handleRegistration = (name: string, level: LevelConfig) => {
    setPlayerName(name);
    setCurrentLevel(level);
    setScreen(GameScreenState.PLAYING);
  };

  /* ---------------- GAME OVER ---------------- */
  const handleGameOver = (timeMs: number) => {
    setLastTime(timeMs);

    const entry: LeaderboardEntry = {
      name: playerName,
      time: timeMs,
      difficulty: currentLevel.id,
      timestamp: Date.now(),
    };

    setLeaderboard(prev => {
      const updated = [...prev, entry]
        // lower time is better
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
      return updated;
    });

    setScreen(GameScreenState.RESULT);
  };

  /* ---------------- RESULT ACTIONS ---------------- */
  const handleReplay = () => {
    setScreen(GameScreenState.PLAYING);
  };

  const handleHome = () => {
    setPlayerName('');
    setScreen(GameScreenState.START);
  };

  return (
    <div className="h-[100dvh] w-full bg-neon-bg text-white relative overflow-hidden select-none">

      {/* GLOBAL LOGO */}
      <img
        src="logo.png"
        className="absolute top-4 left-4 w-16 md:w-24 z-50 pointer-events-none"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">

        {screen === GameScreenState.START && (
          <StartScreen onStart={handleStart} />
        )}

        {screen === GameScreenState.REGISTRATION && (
          <RegistrationScreen
            onSubmit={handleRegistration}
          />
        )}

        {screen === GameScreenState.PLAYING && (
          <GameScreen
            levelConfig={currentLevel}
            onGameOver={handleGameOver}
          />
        )}

        {screen === GameScreenState.RESULT && (
          <ResultScreen
            playerName={playerName}
            time={lastTime}
            difficulty={currentLevel.id}
            leaderboard={leaderboard}
            onReplay={handleReplay}
            onHome={handleHome}
          />
        )}

      </div>
    </div>
  );
};

export default App;
