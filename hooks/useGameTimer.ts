import { useCallback, useRef, useState } from 'react';

export const useGameTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (startTimeRef.current !== null) {
      setElapsedTime(Date.now() - startTimeRef.current);
      requestRef.current = requestAnimationFrame(update);
    }
  }, []);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(update);
  }, [update]);

  const stopTimer = useCallback((): number => {
    let finalTime = 0;

    if (startTimeRef.current !== null) {
      finalTime = Date.now() - startTimeRef.current;
      setElapsedTime(finalTime);
    }

    setIsRunning(false);

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }

    startTimeRef.current = null;
    return finalTime;
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    startTimeRef.current = null;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  return {
    elapsedTime,   // LIVE display
    isRunning,
    startTimer,
    stopTimer,    // FINAL time (ms)
    resetTimer,
  };
};
