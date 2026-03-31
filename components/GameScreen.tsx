import React, { useEffect, useRef, useState } from 'react';
import { useGameTimer } from '../hooks/useGameTimer';
import { formatTime, generateNodePositions } from '../utils/gameUtils';
import { NumberNodeData, LevelConfig } from '../types';

interface GameScreenProps {
  levelConfig: LevelConfig;
  onGameOver: (finalTime: number) => void;
}

type GamePhase = 'MEMORIZE' | 'PLAYING';

const GameScreen: React.FC<GameScreenProps> = ({ levelConfig, onGameOver }) => {
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useGameTimer();

  const [nodes, setNodes] = useState<NumberNodeData[]>([]);
  const [nextExpected, setNextExpected] = useState(1);
  const [phase, setPhase] = useState<GamePhase>('MEMORIZE');

  const gameEndedRef = useRef(false); // 🔒 IMPORTANT

  /* ---------- INIT GAME ---------- */
  useEffect(() => {
    resetTimer();
    gameEndedRef.current = false;
    setNextExpected(1);

    setNodes(
      generateNodePositions(
        levelConfig.nodeCount,
        levelConfig.minDistance
      )
    );

    setPhase('MEMORIZE');

    const timeout = setTimeout(() => {
      setPhase('PLAYING');
      startTimer();
    }, levelConfig.memorizeTime);

    return () => clearTimeout(timeout);
  }, [levelConfig, startTimer, resetTimer]);

  /* ---------- NODE CLICK ---------- */
  const handleNodeClick = (value: number) => {
    if (phase !== 'PLAYING') return;
    if (gameEndedRef.current) return;

    if (value === nextExpected) {
      if (navigator.vibrate) navigator.vibrate(5);

      setNodes(prev =>
        prev.map(n =>
          n.value === value ? { ...n, isClicked: true } : n
        )
      );

      const next = value + 1;
      setNextExpected(next);

      /* ---------- WIN ---------- */
      if (value === levelConfig.nodeCount) {
        gameEndedRef.current = true;

        const finalTime = stopTimer(); // ✅ ALWAYS VALID NUMBER

        onGameOver(finalTime);
      }
    } else {
      if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
    }
  };

  /* ---------- NODE SIZE ---------- */
  const getNodeSizeClass = () => {
    if (levelConfig.nodeCount >= 30) return 'w-10 h-10 text-lg';
    if (levelConfig.nodeCount >= 20) return 'w-12 h-12 text-xl';
    return 'w-14 h-14 md:w-16 md:h-16 text-2xl';
  };

  return (
    <div className="relative w-full h-full flex flex-col">

      {/* ---------- HUD ---------- */}
      <div className="absolute top-0 left-0 w-full p-4 grid grid-cols-3 items-start z-30 pointer-events-none gap-2">
        <div />

        {/* CENTER STATUS */}
        <div className="flex justify-center">
          <div className="bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-lg min-w-[100px] flex flex-col items-center">
            {phase === 'MEMORIZE' ? (
              <span className="text-yellow-400 text-xs font-bold animate-pulse">
                MEMORIZE
              </span>
            ) : (
              <>
                <span className="text-slate-400 text-xs font-mono uppercase">
                  Next
                </span>
                <span className="text-cyan-400 text-2xl font-bold font-mono">
                  {nextExpected <= levelConfig.nodeCount
                    ? nextExpected
                    : 'DONE'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* TIMER */}
        <div className="flex justify-end">
          <div
            className={`
              bg-slate-900/80 border px-6 py-2 rounded-lg
              ${phase === 'MEMORIZE'
                ? 'border-slate-700 opacity-50'
                : 'border-cyan-900/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'}
            `}
          >
            <span className="text-cyan-500 text-xs font-mono block uppercase text-center">
              Timer
            </span>
            <span className="text-white text-3xl font-mono font-bold tracking-widest min-w-[100px] text-center block">
              {phase === 'PLAYING'
                ? formatTime(elapsedTime)
                : formatTime(0)}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- GAME AREA ---------- */}
      <div className="flex-1 relative w-full h-full overflow-hidden touch-none">
        {nodes.map(node => {
          const isCompleted = node.isClicked;
          const isVisible = phase === 'MEMORIZE' || isCompleted;

          return (
            <div
              key={node.value}
              onPointerDown={() => handleNodeClick(node.value)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-20 cursor-pointer ${getNodeSizeClass()}`}
            >
              <div
                className={`
                  w-full h-full rounded-full border-2 flex items-center justify-center
                  font-mono font-bold
                  ${isCompleted
                    ? 'bg-cyan-900 border-cyan-500 text-cyan-200'
                    : 'bg-slate-800 border-white text-white'}
                `}
              >
                {isVisible ? node.value : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
