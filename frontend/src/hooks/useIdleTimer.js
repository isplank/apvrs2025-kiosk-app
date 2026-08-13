import { useState, useEffect, useCallback, useRef } from 'react';
import { APP_CONFIG } from '../config/app.config';

export const useIdleTimer = (onIdle, excludeScreens = []) => {
  const [isIdle, setIsIdle] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (excludeScreens.includes(currentScreen)) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      if (onIdle) onIdle();
    }, APP_CONFIG.kiosk.idleTimeout);
  }, [currentScreen, excludeScreens, onIdle]);

  useEffect(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  return {
    isIdle,
    setIsIdle,
    resetTimer,
    setCurrentScreen,
  };
};