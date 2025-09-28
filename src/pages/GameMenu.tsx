import { useNavigate } from "react-router-dom";

export default function GameMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🎮 Game Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/games/bullethell")}
          className="px-8 py-6 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition"
        >
          🚀 Bullet Hell
        </button>

        <button
          onClick={() => navigate("/games/lightsout")}
          className="px-8 py-6 bg-teal-500 text-white rounded-xl shadow hover:bg-teal-600 transition"
        >
          💡 Lights Out
        </button>
        <button
          onClick={() => navigate("/games/prime")}
          className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
        >
            🔢 Prime or Not
        </button>
      </div>
    </div>
  );
}
