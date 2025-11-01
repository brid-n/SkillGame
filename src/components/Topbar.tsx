import { useEffect, useState } from "react";
import { Bell, User, Trophy } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Topbar() {
  const [score, setScore] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUsername(user.displayName || user.email?.split("@")[0] || "Player");

      // 🔹 Lắng nghe thay đổi realtime từ Firestore (collection "scores")
      const scoreRef = doc(db, "scores", user.uid);
      const unsub = onSnapshot(scoreRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setScore(data.total ?? 0);
        } else {
          setScore(0);
        }
      });

      return () => unsub();
    } else {
      // Nếu chưa đăng nhập → đọc điểm tạm từ localStorage
      const localScore = Number(localStorage.getItem("localScore") || "0");
      setScore(localScore);
      setUsername("Guest");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md shadow-md flex items-center justify-between px-6 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
        SkillGames
      </h1>

      <div className="flex items-center gap-6">
        {/* 🏆 Điểm người chơi */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1.5 rounded-full shadow-md font-semibold">
          <Trophy className="w-5 h-5 text-white drop-shadow" />
          <span>{score} điểm</span>
        </div>

        {/* 🔔 Thông báo */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* 👤 Người dùng */}
        <div className="relative group">
          <button className="p-2 rounded-full hover:bg-gray-100 flex items-center gap-2 transition">
            <User className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 text-sm font-medium">
              {username}
            </span>
          </button>

          {/* Menu thả xuống */}
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg hidden group-hover:block">
            <a
              href="#profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Hồ sơ
            </a>
            <button
              onClick={() => auth.signOut()}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
