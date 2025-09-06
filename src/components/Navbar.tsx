
import { Home, Gamepad, Settings } from "lucide-react";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const menuItems = [
    { name: "Trang chủ", icon: <Home className="w-6 h-6" /> },
    { name: "Trò chơi", icon: <Gamepad className="w-6 h-6" /> },
    { name: "Cài đặt", icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 hover:bg-gray-800 w-full"
      >
        {isOpen ? "⬅" : "➡"}
      </button>

      <ul className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800 cursor-pointer group"
          >
            {item.icon}
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100 absolute left-20 bg-gray-800 px-2 py-1 rounded"
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
