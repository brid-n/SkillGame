import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrimeOrNot() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Sinh số mới
  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 100) + 2);
    setMessage("");
    setFeedback(null);
  };

  // Kiểm tra số nguyên tố
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Người chơi chọn
  const handleChoice = (choice: boolean) => {
    const correct = isPrime(number);
    if (choice === correct) {
      setScore((s) => s + 1);
      setMessage("✅ Chính xác! +1 điểm");
      setFeedback("correct");
    } else {
      setScore((s) => Math.max(0, s - 1));
      setLives((l) => l - 1);
      setMessage("❌ Sai rồi! -1 điểm");
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (lives > 1) generateNumber();
      else setMessage("💀 Hết lượt! Điểm của bạn: " + score);
    }, 1000);
  };

  // Khi khởi tạo game
  useEffect(() => {
    generateNumber();
  }, []);

  const restartGame = () => {
    setScore(0);
    setLives(10);
    generateNumber();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-wide text-yellow-400 drop-shadow">
          🔢 Prime or Not?
        </h1>
        <p className="text-lg text-gray-200">
          Bạn có 10 lượt. Đoán xem số sau có phải số nguyên tố không?
        </p>

        {/* Hiển thị số */}
        <div
          className={`mt-6 text-8xl font-extrabold transition-all duration-300 ${
            feedback === "correct"
              ? "text-green-400 scale-110"
              : feedback === "wrong"
              ? "text-red-400 scale-90"
              : "text-white"
          }`}
        >
          {number}
        </div>

        {/* Nút chọn */}
        {lives > 0 && (
          <div className="flex justify-center gap-8 mt-8">
            <button
              onClick={() => handleChoice(true)}
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg transform hover:scale-105 transition"
            >
              Nguyên tố
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="bg-red-500 hover:bg-red-400 text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg transform hover:scale-105 transition"
            >
              Không phải
            </button>
          </div>
        )}

        {/* Thông tin */}
        <div className="mt-6 space-y-2">
          <p className="text-lg font-semibold text-yellow-300">{message}</p>
          <p className="text-md text-gray-300">
            Điểm: <span className="text-white font-bold">{score}</span> | Mạng:{" "}
            <span className="text-red-400 font-bold">{lives}</span>
          </p>
        </div>

        {/* Khi hết mạng */}
        {lives <= 0 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-2xl text-yellow-300 font-bold">
              🎮 Trò chơi kết thúc!
            </p>
            <p className="text-lg text-gray-200">
              Tổng điểm: <span className="text-white font-extrabold">{score}</span>
            </p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={restartGame}
                className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200 flex items-center gap-2"
              >
                <RotateCcw size={18} /> Chơi lại
              </button>
              <button
                onClick={() => navigate("/games")}
                className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200 flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Trở về menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
