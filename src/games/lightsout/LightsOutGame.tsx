import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLightsOut } from "./useLightsOut";
import Board from "./Board";
import { useScore } from "../../hooks/useScore";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function LightsOutGame() {
  const navigate = useNavigate();
  const { board, toggle, isWin, reset } = useLightsOut(5);
  const { addScore } = useScore();

  const [showTutorial, setShowTutorial] = useState(true);
  const [hasScored, setHasScored] = useState(false);

  // 🔹 Thống kê cần lưu
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());

  // Khi nhấn vào một ô
  const handleToggle = (i: number, j: number) => {
    toggle(i, j);
    setMoves((m) => m + 1);
  };

  // 🔥 Lưu lịch sử vào Firestore
  const saveHistory = async (timeSpent: number) => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(
      db,
      "history",
      user.uid,
      "lightsout",
      Date.now().toString()
    );

    await setDoc(ref, {
      userId: user.uid,
      game: "LightsOut",
      scoreEarned: 10,
      timeSpent,
      moves,
      createdAt: new Date(),
    });
  };

  // 🔥 Khi thắng → cộng điểm + lưu Firebase
  useEffect(() => {
    if (isWin && !hasScored) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      addScore(10);      // +10 điểm tổng
      saveHistory(timeSpent); // lưu Firebase

      setHasScored(true);
    }
  }, [isWin]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
      
      {/* Tutorial */}
      {showTutorial && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">
            💡 Lights Out
          </h1>
          <p className="mb-6 text-lg text-gray-200">
            Nhấp vào ô để bật/tắt đèn và các ô xung quanh.  
            Mục tiêu: tắt hết tất cả ánh sáng.
          </p>
          <button
            onClick={() => setShowTutorial(false)}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold shadow hover:bg-yellow-300 transition"
          >
            Bắt đầu
          </button>
        </div>
      )}

      {/* Board */}
      <div className="flex flex-col items-center gap-4">
        <Board board={board} onToggle={handleToggle} />

        {isWin && (
          <p className="text-green-400 font-bold text-lg mt-2">
            🎉 Bạn đã thắng! (+10 điểm)
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              reset();
              setMoves(0);
              setHasScored(false);
            }}
            className="bg-white text-black px-5 py-2 rounded-lg shadow hover:bg-gray-200 flex items-center"
          >
            <RotateCcw className="mr-2" size={18} /> Reset
          </button>

          <button
            onClick={() => navigate("/games")}
            className="bg-white text-black px-5 py-2 rounded-lg shadow hover:bg-gray-200 flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} /> Trở về Menu
          </button>
        </div>
      </div>
    </div>
  );
}
