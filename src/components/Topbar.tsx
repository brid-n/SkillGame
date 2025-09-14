import { Bell, User } from "lucide-react";
import { auth } from "../firebase";

export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md flex items-center justify-between px-4 z-50">
      <h1 className="text-xl font-bold text-blue-600">SkillGames</h1>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="relative group">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User className="w-6 h-6 text-gray-700" />
          </button>

          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block">
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
