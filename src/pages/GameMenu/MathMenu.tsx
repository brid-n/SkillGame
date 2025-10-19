import { useNavigate } from "react-router-dom";

export default function MathMenu() {
  const navigate = useNavigate();

  const games = [
    { name: "Prime or Not", path: "/games/math/primegame", emoji: "🔢" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-800 to-yellow-900 text-white">
      <h1 className="text-4xl font-bold mb-8">🧮 Trò chơi Toán học</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.path}
            onClick={() => navigate(game.path)}
            className="bg-yellow-600 hover:bg-yellow-500 p-6 rounded-xl shadow-lg text-center transition transform hover:scale-105"
          >
            <div className="text-5xl mb-3">{game.emoji}</div>
            <h2 className="text-xl font-semibold">{game.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}
