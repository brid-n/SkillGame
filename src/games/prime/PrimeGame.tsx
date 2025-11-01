import { useEffect, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScore } from "../../hooks/useScore";

export default function PrimeGame() {
  const [number, setNumber] = useState(2);
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(10);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { addScore } = useScore();

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 100) + 2);
  }, []);

  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  };

  const handleAnswer = (ans: boolean) => {
    const correct = isPrime(number);
    if (ans === correct) {
      setMessage("✅ Đúng rồi! +1 điểm");
      setScore((s) => s + 1);
      addScore(1);
    } else {
      setMessage("❌ Sai rồi! -1 điểm");
      setScore((s) => Math.max(0, s - 1));
      setLives((l) => l - 1);
      addScore(-1);
    }
    setNumber(Math.floor(Math.random() * 100) + 2);
  };

  const reset = () => {
    setNumber(Math.floor(Math.random() * 100) + 2);
    setMessage("");
    setLives(10);
    setScore(0);
  };

  if (lives <= 0)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center">
        <h1 className="text-4xl font-bold mb-4">💀 Hết lượt rồi!</h1>
        <p className="mb-4 text-lg">Điểm của bạn: {score}</p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <RotateCcw className="mr-2" /> Chơi lại
          </button>
          <button
            onClick={() => navigate("/games")}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <ArrowLeft className="mr-2" /> Về Menu
          </button>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white text-center">
      <h1 className="text-5xl font-bold mb-6">🔢 Prime or Not</h1>

      <div className="bg-white/10 backdrop-blur-md px-12 py-8 rounded-2xl shadow-lg">
        <h2 className="text-6xl font-extrabold text-yellow-300 mb-6">{number}</h2>

        <div className="flex gap-6 justify-center mb-4">
          <button
            onClick={() => handleAnswer(true)}
            className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg"
          >
            Prime
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg"
          >
            Not Prime
          </button>
        </div>

        <p className="text-lg mt-2">{message}</p>
        <p className="text-sm text-gray-300 mt-2">❤️ {lives} mạng còn lại</p>
      </div>

      <p className="absolute bottom-6 right-8 text-gray-400 text-sm">
        Điểm hiện tại: {score}
      </p>
    </div>
  );
}
