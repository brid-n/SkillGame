import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white text-center px-6">
      {/* Tiêu đề chính */}
      <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
        🎮 SkillGames
      </h1>

      {/* Mô tả */}
      <p className="max-w-xl text-gray-300 text-lg mb-10 leading-relaxed">
        Rèn luyện phản xạ, tư duy logic và khả năng tính toán qua các mini game thú vị.
        <br />
        Càng chơi, bạn càng nhanh nhẹn và thông minh hơn!
      </p>

      {/* Nút bắt đầu */}
      <button
        onClick={() => navigate("/games")}
        className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform px-8 py-4 rounded-2xl shadow-lg text-lg font-semibold"
      >
        <PlayCircle size={28} />
        Bắt đầu chơi ngay
      </button>

      {/* Footer */}
      <footer className="absolute bottom-6 text-gray-500 text-sm italic">
        © 2025 SkillGames — Học mà chơi, chơi mà học 💡
      </footer>

      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}
