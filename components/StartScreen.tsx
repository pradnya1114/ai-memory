
import React, { useState } from 'react';
import { Difficulty, LevelConfig } from '../types';
import { LEVELS } from '../constants';

interface StartScreenProps {
  onStart: (name: string, level: LevelConfig) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Difficulty>('EASY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim(), LEVELS[selectedLevel]);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      
      {/* Main Content Card */}
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 text-center animate-pop-in z-10">
        
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-40 animate-pulse-fast"></div>
          <h1 className="relative text-5xl font-bold text-white tracking-tighter" style={{ textShadow: '0 0 20px rgba(0,243,255,0.5)' }}>
            REFLEX
            <span className="block text-2xl font-light text-cyan-300 tracking-widest mt-2">CHALLENGE</span>
          </h1>
        </div>

        <p className="text-gray-400 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
          Memorize the pattern.<br/>
          Click the hidden numbers in order.<br />
          <span className="text-cyan-400 font-bold">Speed is everything.</span>
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER AGENT NAME"
              maxLength={15}
              className="w-full bg-slate-900/80 border-2 border-slate-700 text-center text-xl text-white py-4 px-6 rounded-xl outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600 uppercase tracking-wider font-mono shadow-lg"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            {(Object.keys(LEVELS) as Difficulty[]).map((levelKey) => {
              const level = LEVELS[levelKey];
              const isSelected = selectedLevel === levelKey;
              return (
                <button
                  key={levelKey}
                  type="button"
                  onClick={() => setSelectedLevel(levelKey)}
                  className={`
                    py-3 px-1 rounded-lg text-xs md:text-sm font-bold border transition-all duration-200 uppercase tracking-wide
                    ${isSelected 
                      ? 'bg-cyan-900/60 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)] scale-105' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800'}
                  `}
                >
                  {level.label}
                </button>
              )
            })}
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              w-full py-4 px-6 rounded-xl text-xl font-bold tracking-widest transition-all duration-300 shadow-xl
              ${name.trim() 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-95' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
            `}
          >
            INITIATE SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
