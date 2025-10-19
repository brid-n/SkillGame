import { useNavigate } from "react-router-dom";

export default function MainGameMenu() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Phản xạ",
      path: "/games/reflex",
      emoji: "🎯",
      gradient: "from-red-600 to-orange-600",
    },
    {
      name: "Logic",
      path: "/games/logic",
      emoji: "🧩",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      name: "Toán học",
      path: "/games/math",
      emoji: "🧮",
      gradient: "from-yellow-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3">🎮 SkillGames</h1>
        <p className="text-gray-300 text-lg">
          Chọn chủ đề bạn muốn rèn luyện hôm nay
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <button
            key={cat.path}
            onClick={() => navigate(cat.path)}
            className={`bg-gradient-to-br ${cat.gradient} hover:scale-105 transition transform p-8 rounded-2xl shadow-xl text-center w-64 h-64 flex flex-col items-center justify-center`}
          >
            <div className="text-6xl mb-4">{cat.emoji}</div>
            <h2 className="text-2xl font-semibold">{cat.name}</h2>
          </button>
        ))}
      </div>

      <p className="text-gray-400 mt-10 italic text-sm">
        “Học kỹ năng sống qua những mini game thú vị.”
      </p>
    </div>
  );
}
