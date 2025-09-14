import { Gamepad2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-6">
      {/* Hero Text */}
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          <span className="text-yellow-300">Skill Games</span> <br />
          Nơi rèn luyện kỹ năng qua trò chơi 🎮
        </h1>

        <p className="text-xl text-gray-100 mb-10 drop-shadow">
          Khám phá các mini game thú vị để phát triển kỹ năng sống của bạn.  
          Học mà chơi – Chơi mà học.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/games")}
            className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-2xl shadow-lg flex items-center gap-3 hover:bg-yellow-300 transition"
          >
            <Gamepad2 className="w-6 h-6" />
            Bắt đầu chơi
          </button>

          <button
            onClick={() => alert('Tính năng Coming Soon!')}
            className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl shadow-lg flex items-center gap-3 hover:bg-white/30 transition"
          >
            <Sparkles className="w-6 h-6" />
            Khám phá thêm
          </button>
        </div>
      </div>
    </div>
  );
}
