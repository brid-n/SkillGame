import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLightsOut } from "./useLightsOut";
import Board from "./Board";
import { useScore } from "../../hooks/useScore";

export default function LightsOutGame() {
  const navigate = useNavigate();
  const { board, toggle, isWin, reset } = useLightsOut(5);
  const { addScore } = useScore();
  const [showTutorial, setShowTutorial] = useState(true);
  const [hasScored, setHasScored] = useState(false);

  if (isWin && !hasScored) {
    addScore(10);
    setHasScored(true);
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
      {/* Tutorial overlay */}
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
        <Board board={board} onToggle={toggle} />
        {isWin && (
          <p className="text-green-400 font-bold text-lg mt-2">
            🎉 Bạn đã thắng +10 điểm!
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              reset();
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
