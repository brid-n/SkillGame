import { useState, type JSX } from "react";
import { Bell, User as UserIcon } from "lucide-react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Topbar(): JSX.Element {
  const [user] = useAuthState(auth); // Lấy user trực tiếp
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setDropdownOpen(false); // đóng dropdown sau khi logout
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md flex items-center justify-between px-4 z-50">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-blue-600">SkillGames</h1>

      <div className="flex items-center gap-4 relative">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
          >
            <UserIcon className="w-6 h-6 text-gray-700" />
            {user?.displayName || user?.email ? (
              <span className="hidden sm:inline text-gray-700 font-medium">
                {user.displayName || user.email}
              </span>
            ) : null}
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <a
                href="#profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Hồ sơ
              </a>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
