// games/prime/PrimeGame.tsx
import { usePrimeGame } from "./usePrimeGame";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrimeGame() {
  const navigate = useNavigate();
  const { number, score, timeLeft, gameOver, answer, resetGame } = usePrimeGame(60);

  return (
    <div className="relative fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Hiệu ứng số rơi */}
      <div className="absolute inset-0 opacity-10 text-6xl font-mono animate-pulse pointer-events-none select-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatDown ${10 + Math.random() * 10}s linear infinite`,
            }}
          >
            {Math.floor(Math.random() * 500)}
          </span>
        ))}
      </div>

      {/* Nội dung game */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-[400px] text-center border border-purple-500/40">
        {!gameOver ? (
          <>
            <h1 className="text-3xl font-bold mb-4">🔢 Prime or Not?</h1>
            <p className="mb-6 text-gray-300">
              ⏳ {timeLeft}s | ⭐ Score: {score}
            </p>

            <div className="text-7xl font-extrabold text-purple-300 drop-shadow-lg mb-8 animate-pulse">
              {number}
            </div>

            <div className="flex gap-6 justify-center">
              <button
                onClick={() => answer(true)}
                className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg shadow-lg text-lg font-bold transition-transform hover:scale-105"
              >
                Prime
              </button>
              <button
                onClick={() => answer(false)}
                className="bg-red-500 hover:bg-red-400 text-black px-6 py-3 rounded-lg shadow-lg text-lg font-bold transition-transform hover:scale-105"
              >
                Not Prime
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">🎉 Game Over</h1>
            <p className="mb-6 text-lg">⭐ Your Score: {score}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <RotateCcw className="inline-block mr-1" size={18} />
                Play Again
              </button>
              <button
                onClick={() => navigate("/games")}
                className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <ArrowLeft className="inline-block mr-1" size={18} />
                Menu
              </button>
            </div>
          </>
        )}
      </div>

      {/* CSS cho hiệu ứng số rơi */}
      <style>
        {`
          @keyframes floatDown {
            from { transform: translateY(-100%); opacity: 0.5; }
            to { transform: translateY(100vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
