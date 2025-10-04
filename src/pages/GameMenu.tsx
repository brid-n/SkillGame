import { useNavigate } from "react-router-dom";
import { Brain, Zap, Calculator } from "lucide-react";

export default function GameMenu() {
  const navigate = useNavigate();

  const games = [
    {
      title: "🎯 Bullet Hell",
      desc: "Game né đạn rèn luyện phản xạ cực nhanh.",
      icon: <Zap size={40} className="text-red-400" />,
      path: "/games/bullethell",
      color: "from-red-500/40 to-pink-600/40 hover:from-red-500/70 hover:to-pink-600/70",
    },
    {
      title: "💡 Lights Out",
      desc: "Tắt hết các đèn bằng logic tinh tế.",
      icon: <Brain size={40} className="text-yellow-300" />,
      path: "/games/lightsout",
      color: "from-yellow-400/40 to-orange-500/40 hover:from-yellow-400/70 hover:to-orange-500/70",
    },
    {
      title: "🔢 Prime or Not",
      desc: "Nhận biết số nguyên tố nhanh để ghi điểm!",
      icon: <Calculator size={40} className="text-green-400" />,
      path: "/games/prime",
      color: "from-green-500/40 to-emerald-500/40 hover:from-green-500/70 hover:to-emerald-500/70",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-28 pb-16 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 text-white">
      {/* Hiệu ứng nền mờ */}
      <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-7xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatDown ${10 + Math.random() * 10}s linear infinite`,
            }}
          >
            {Math.floor(Math.random() * 99)}
          </span>
        ))}
      </div>

      {/* Tiêu đề */}
      <h1 className="text-5xl font-extrabold mb-12 text-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.9)] z-10">
        🎮 Chọn Trò Chơi
      </h1>

      {/* Danh sách game */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10 px-10">
        {games.map((game, i) => (
          <div
            key={i}
            onClick={() => navigate(game.path)}
            className={`cursor-pointer backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 text-center transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${game.color}`}
          >
            <div className="flex justify-center mb-4">{game.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
            <p className="text-gray-200 text-sm">{game.desc}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes floatDown {
            from { transform: translateY(-120%); opacity: 0.4; }
            to { transform: translateY(120vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
