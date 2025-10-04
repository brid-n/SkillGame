import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

export default function PrimeGame() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(Math.floor(Math.random() * 999) + 2);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [canAnswer, setCanAnswer] = useState(true);

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const resetGame = () => {
    setScore(0);
    setLives(10);
    setTimeLeft(60);
    setGameOver(false);
    setNumber(Math.floor(Math.random() * 999) + 2);
  };

  const handleAnswer = (prime: boolean) => {
    if (!canAnswer || gameOver) return;
    setCanAnswer(false);

    const correct = isPrime(number) === prime;
    if (correct) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setScore((s) => Math.max(0, s - 1));
      setLives((l) => l - 1);
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback(null);
      setCanAnswer(true);
      setNumber(Math.floor(Math.random() * 999) + 2);
    }, 600);
  };

  useEffect(() => {
    if (lives <= 0) setGameOver(true);
  }, [lives]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden"
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Nền động */}
      <div className="absolute inset-0 opacity-10 text-8xl font-mono pointer-events-none select-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatDown ${10 + Math.random() * 10}s linear infinite`,
            }}
          >
            {Math.floor(Math.random() * 999)}
          </span>
        ))}
      </div>

      {/* Game UI */}
      <div className="relative z-10 bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/40 px-20 py-14 text-center w-[90vw] max-w-[950px]">
        {!gameOver ? (
          <>
            <h1 className="text-6xl font-bold mb-6 text-purple-200 drop-shadow-lg">
              🔢 PRIME or NOT?
            </h1>

            <div className="mb-6 text-xl text-gray-300 flex justify-center items-center gap-10">
              <span>⏳ {timeLeft}s</span>
              <span>⭐ {score}</span>
              <span>❤️ {lives}</span>
            </div>

            <div className="text-[12rem] font-extrabold text-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.9)] mb-10 animate-pulse">
              {number}
            </div>

            <div className="flex gap-16 justify-center">
              <button
                disabled={!canAnswer}
                onClick={() => handleAnswer(true)}
                className={`${
                  canAnswer ? "bg-green-500 hover:bg-green-400" : "bg-gray-500"
                } text-black px-14 py-6 rounded-2xl shadow-lg text-3xl font-bold transition-transform hover:scale-110 active:scale-95`}
              >
                PRIME
              </button>
              <button
                disabled={!canAnswer}
                onClick={() => handleAnswer(false)}
                className={`${
                  canAnswer ? "bg-red-500 hover:bg-red-400" : "bg-gray-500"
                } text-black px-14 py-6 rounded-2xl shadow-lg text-3xl font-bold transition-transform hover:scale-110 active:scale-95`}
              >
                NOT PRIME
              </button>
            </div>

            {feedback && (
              <div
                className={`absolute inset-0 flex items-center justify-center text-7xl font-bold transition-all ${
                  feedback === "correct"
                    ? "text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.9)]"
                    : "text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.9)]"
                }`}
              >
                {feedback === "correct" ? "✅ Đúng!" : "❌ Sai!"}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-6xl font-bold mb-8 text-yellow-300 drop-shadow-lg">
              🎯 GAME OVER
            </h1>
            <p className="text-3xl mb-10 text-gray-200">⭐ Score: {score}</p>

            <div className="flex gap-8 justify-center">
              <button
                onClick={resetGame}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-xl shadow-lg text-2xl font-semibold transition-transform hover:scale-105"
              >
                <RotateCcw className="inline-block mr-2" size={24} />
                Play Again
              </button>
              <button
                onClick={() => navigate("/games")}
                className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl shadow-lg text-2xl font-semibold transition-transform hover:scale-105"
              >
                <ArrowLeft className="inline-block mr-2" size={24} />
                Menu
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Nút thoát ra trong lúc chơi */}
      {!gameOver && (
        <button
          onClick={() => navigate("/games")}
          className="absolute bottom-8 left-8 bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-200 transition-all"
          title="Back to Game Menu"
        >
          <ArrowLeft size={26} />
        </button>
      )}

      <style>
        {`
          html, body {
            overflow: hidden;
            height: 100%;
            width: 100%;
            margin: 0;
          }

          @keyframes floatDown {
            from { transform: translateY(-120%); opacity: 0.4; }
            to { transform: translateY(120vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
