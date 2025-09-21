import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLightsOut } from "./useLightsOut";
import Board from "./Board";

export default function LightsOutGame() {
  const navigate = useNavigate();
  const { board, toggle, isWin, reset } = useLightsOut(5);
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Tutorial overlay */}
      {showTutorial && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 animate-fadeIn">
          <div className="max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
            <h1 className="text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow">
              💡 Lights Out
            </h1>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Nhấp vào một ô để bật/tắt nó cùng với các ô lân cận. <br />
              <span className="text-yellow-300 font-semibold">
                Mục tiêu: tắt hết tất cả đèn!
              </span>
            </p>
            <button
              onClick={() => setShowTutorial(false)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition"
            >
              Bắt đầu chơi
            </button>
          </div>
        </div>
      )}

      {/* Main game */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold mb-2 tracking-wide">
          Lights Out Puzzle
        </h2>

        <Board board={board} onToggle={toggle} />

        {isWin && (
          <p className="text-green-400 font-bold text-xl mt-4 animate-bounce">
            🎉 Bạn đã thắng!
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-100 text-black px-5 py-2.5 rounded-lg shadow hover:from-gray-300 hover:to-gray-200 transition"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={() => navigate("/games")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition"
          >
            <ArrowLeft size={18} />
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}
