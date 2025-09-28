// games/prime/usePrimeGame.ts
import { useState, useEffect } from "react";
import { isPrime } from "./utils";

export function usePrimeGame(duration: number = 60) {
  const [number, setNumber] = useState(() => Math.floor(Math.random() * 500) + 2);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  function nextNumber() {
    setNumber(Math.floor(Math.random() * 500) + 2);
  }

  function answer(isPrimeGuess: boolean) {
    if (gameOver) return;
    if (isPrime(number) === isPrimeGuess) {
      setScore((s) => s + 1);
    }
    nextNumber();
  }

  function resetGame() {
    setScore(0);
    setTimeLeft(duration);
    setGameOver(false);
    nextNumber();
  }

  return { number, score, timeLeft, gameOver, answer, resetGame };
}
