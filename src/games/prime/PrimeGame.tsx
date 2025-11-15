import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useScore } from "../../hooks/useScore";

export default function PrimeOrNot() {
  const navigate = useNavigate();
  const { addScore } = useScore(); // ⭐ Dùng tổng điểm
  const [number, setNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Timer 60s
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  // Sinh số mới
  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 200) + 2);
    setMessage("");
    setFeedback(null);
  };

  // check prime
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
    return true;
  };

  // Người chơi chọn
  const handleChoice = (choice: boolean) => {
    if (gameOver) return;

    const correct = isPrime(number);

    if (correct === choice) {
      setGameScore((s) => s + 1);
      addScore(1);          // ⭐ Cộng điểm GLOBAL
      setMessage("✅ Chính xác! +1 điểm");
      setFeedback("correct");
    } else {
      setGameScore((s) => Math.max(0, s - 1));
      addScore(-1);         // ⭐ Trừ điểm GLOBAL
      setLives((l) => l - 1);
      setMessage("❌ Sai rồi! -1 điểm");
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (lives > 1 && timeLeft > 1) generateNumber();
      else finishGame();
    }, 800);
  };

  // Timer
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver]);

  // Kết thúc + lưu Firestore
  const finishGame = async () => {
    if (gameOver) return;
    setGameOver(true);

    const user = auth.currentUser;
    if (!user) return;

    const timeUsed = Math.floor((Date.now() - startTime) / 1000);

    await addDoc(collection(db, "GameResults"), {
      userId: user.uid,
      game: "prime-or-not; day la tro choi doan xem so do co phai la so nguyen to hay khong truoc ap luc thoi gian la 1 phut, nguoi choi phai dung cac quy tac va kha nang tinh toan nhanh de tim ra cau tra loi nhanh nhat va kiem duoc that nhieu diem",
      score: gameScore,
      timeUsed,
      createdAt: new Date(),
    });
  };

  // Init
  useEffect(() => {
    generateNumber();
  }, []);

  const restartGame = () => {
    setGameScore(0);
    setLives(10);
    setTimeLeft(60);
    setGameOver(false);
    generateNumber();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white p-6">

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-wide text-yellow-400 drop-shadow">
          🔢 Prime or Not?
        </h1>

        <p className="text-lg text-gray-200">
          Bạn có 10 lượt và 60 giây. Đoán xem số sau có phải số nguyên tố không?
        </p>

        {/* Timer */}
        <p className="text-xl font-bold text-blue-300 mt-2">
          ⏳ Thời gian còn lại: <span className="text-white">{timeLeft}s</span>
        </p>

        {/* Số hiển thị */}
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

        {/* Buttons */}
        {!gameOver && (
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

          {!gameOver && (
            <p className="text-md text-gray-300">
              Điểm: <span className="text-white font-bold">{gameScore}</span> | Mạng:{" "}
              <span className="text-red-400 font-bold">{lives}</span>
            </p>
          )}
        </div>

        {/* Game over */}
        {gameOver && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-2xl text-yellow-300 font-bold">
              🎮 Trò chơi kết thúc!
            </p>
            <p className="text-lg text-gray-200">
              Tổng điểm:{" "}
              <span className="text-white font-extrabold">{gameScore}</span>
            </p>

            <p className="text-lg text-gray-300">
              Thời gian chơi:{" "}
              <span className="text-blue-300 font-bold">
                {60 - timeLeft} giây
              </span>
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
