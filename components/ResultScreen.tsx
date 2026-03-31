import React from 'react';
import { LeaderboardEntry, Difficulty } from '../types';
import { formatTime } from '../utils/gameUtils';

interface ResultScreenProps {
  time: number;
  playerName: string;
  difficulty: Difficulty;
  leaderboard: LeaderboardEntry[];
  onReplay: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  time,
  playerName,
  difficulty,
  leaderboard,
  onReplay,
  onHome,
}) => {
  const safeTime = Number.isFinite(time) ? time : 0;

  return (
    <div className="w-full max-w-7xl flex gap-10 p-6">

      {/* LEFT : SCORE */}
      <div className="w-[340px] bg-slate-900/90 rounded-3xl p-8 flex flex-col justify-between">
        <div>
          <p className="text-slate-400 text-sm uppercase">Player</p>
          <p className="text-xl font-bold mb-3">{playerName}</p>

          <p className="text-slate-400 text-sm uppercase">Difficulty</p>
          <p className="text-cyan-400 mb-3">{difficulty}</p>

          <p className="text-slate-400 text-sm uppercase">Time Taken</p>
          <p className="text-5xl font-mono text-cyan-400">
            {formatTime(safeTime)}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onReplay}
            className="py-3 rounded-xl bg-cyan-600 font-bold hover:bg-cyan-500"
          >
            ▶ PLAY AGAIN
          </button>
          <button
            onClick={onHome}
            className="py-3 rounded-xl border border-slate-600"
          >
            ⬅ HOME
          </button>
        </div>
      </div>

      {/* RIGHT : LEADERBOARD */}
      <div className="flex-1 bg-slate-900/60 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-cyan-300 font-bold uppercase tracking-wider">
            🏆 Top 10 Leaderboard
          </h3>
        </div>

        <div className="p-4 space-y-2">
          {leaderboard.map((e, i) => (
            <div
              key={e.timestamp}
              className="flex justify-between p-3 bg-slate-800/50 rounded-lg"
            >
              <span>#{i + 1} {e.name}</span>
              <span className="font-mono">
                {formatTime(e.time)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
